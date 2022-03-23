/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import 'codemirror/addon/display/autorefresh';

import 'codemirror/addon/edit/closebrackets';

import 'codemirror/addon/edit/closetag';

import 'codemirror/addon/edit/matchbrackets';

import 'codemirror/addon/fold/brace-fold';

import 'codemirror/addon/fold/comment-fold';

import 'codemirror/addon/fold/foldcode';

import 'codemirror/addon/fold/foldgutter.css';

import 'codemirror/addon/fold/foldgutter';

import 'codemirror/addon/fold/indent-fold';

import 'codemirror/addon/hint/show-hint.css';

import 'codemirror/addon/hint/show-hint';

import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/javascript/javascript';
import CodeMirror from 'codemirror';
import React, {useEffect, useRef} from 'react';

const AUTOCOMPLETE_EXCLUDED_KEYS = new Set([
	' ',
	',',
	';',
	'Alt',
	'AltGraph',
	'AltRight',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowUp',
	'Control',
	'Enter',
	'Escape',
	'Delete',
	'Meta',
	'Return',
	'Shift',
]);

const MODES = {
	json: {
		name: 'JSON',
		type: 'application/json',
	},
};

// function hint(cm, callback, options) {
// 	console.log('hello');
// 	const cursor = cm.getCursor();
// 	const token = cm.getTokenAt(cursor);

// 	console.log(cursor, token);

// 	const results = ['test', 'test2', 'test3'];

// 	const line = cm.getLine(cursor.line).slice(0, cursor.ch);

// 	const match = (line.match(new RegExp(/[[\]"]/, 'g')) || []).pop();

// 	return {
// 		from: CodeMirror.Pos(cursor.line, cursor.ch - match.length),
// 		list: results,
// 		to: CodeMirror.Pos(cursor.line, cursor.ch),
// 	};
// }

const TERMS = {
	['string property']: ['list', 'index', 'set'],
};

/**
 * Checks if a Code Mirror token is a object property. For example "name" in
 * {"name": "test"}.
 * @param {Token} token Code Mirror token
 * @returns {boolean}
 */
function isObjectProperty(token) {
	return (
		token.type === 'string property' &&
		token.string.length > 1 &&
		token.string.startsWith('"') &&
		token.string.endsWith('"')
	);
}

/**
 * Removes quotes from a string. For example "test" -> test.
 * @param {string} value
 * @returns {string}
 */
function removeQuotes(value) {
	return value.replace(/^"(.*)"$/, '$1');
}

function hint(cm, options) {
	const cursor = cm.getCursor();
	const token = cm.getTokenAt(cursor);

	const start = token.start - 1;
	const end = token.end;

	if (token.type !== 'string property') {
		return;
	}

	// Build a list of parent properties.

	// Get brackets and properties. Returns an array like:
	// ['{', 'description_i18n', '{', 'en_US']

	let propertyBracketArray = [];

	for (let currentLine = 0; currentLine <= cursor.line; currentLine++) {
		const linePropertyBracketArray = cm
			.getLineTokens(currentLine)
			.filter((token) => {
				// Get tokens only before the cursor.

				if (currentLine === cursor.line && token.end > cursor.ch) {
					return false;
				}

				return (
					token.string === '{' ||
					token.string === '}' ||
					isObjectProperty(token)
				);
			})
			.map((token) => removeQuotes(token.string));

		propertyBracketArray = [
			...propertyBracketArray,
			...linePropertyBracketArray,
		];
	}

	console.log('propertyBracketArray', propertyBracketArray);

	// Filter the `propertyBracketArray` to get only the parent properties.
	// For example: ['en_US', 'description_i18n']

	const propertyTree = [];

	while (propertyBracketArray.length > 0) {
		const lastItem = propertyBracketArray.pop();

		if (lastItem === '}') {
			// Remove items up to the last '{' and previous item, assuming
			// that the previous item before '{' is a property string.

			propertyBracketArray = propertyBracketArray.slice(
				0,
				propertyBracketArray.lastIndexOf('{') - 1
			);
		} else if (lastItem === '{' && propertyBracketArray.length > 1) {
			propertyTree.push(propertyBracketArray.pop());
		}
	}

	console.log('propertyTree', propertyTree);

	// Get autocomplete suggestions.

	let list = TERMS[token.type];

	const search = token.string.match(/[@]?\w+/);

	if (search !== null) {
		list = list.filter((t) => {
			return t.indexOf(search) > -1;
		});
	}

	return {
		from: CodeMirror.Pos(cursor.line, start + 2),
		list: list.map((item) => {
			return {
				displayText: item,
				text: item + '"', // Adds ending quote after auto-completing.
			};
		}),
		to: CodeMirror.Pos(cursor.line, end),
	};
}

/**
 * Reusing the `ref` from `forwardRef` with React hooks
 * https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 */

function useCombinedRefs(...refs) {
	const targetRef = React.useRef();

	React.useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) {
				return;
			}

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef;
}

const CodeMirrorEditor = React.forwardRef(
	(
		{
			folded = false,
			lineWrapping = true,
			onChange = () => {},
			mode = 'json',
			value = '',
			readOnly = false,
		},
		ref
	) => {
		const innerRef = useRef(ref);
		const editorWrapperRef = useRef();
		const editorRef = useCombinedRefs(ref, innerRef);

		useEffect(() => {
			if (editorWrapperRef.current) {
				const codeMirror = CodeMirror(editorWrapperRef.current, {
					autoCloseTags: true,
					autoRefresh: true,
					extraKeys: {
						'Ctrl-Space': 'autocomplete',
					},
					foldGutter: true,
					gutters: [
						'CodeMirror-linenumbers',
						'CodeMirror-foldgutter',
					],
					hintOptions: {
						completeSingle: false,
					},
					indentWithTabs: true,
					inputStyle: 'contenteditable',
					lineNumbers: true,
					lineWrapping,
					matchBrackets: true,
					mode: {globalVars: true, name: MODES[mode].type},
					readOnly,
					showHint: true,
					tabSize: 2,
					value,
				});

				CodeMirror.registerHelper('hint', 'json', hint);

				codeMirror.on('change', (cm) => {
					onChange(cm.getValue());
				});

				codeMirror.on('keyup', (cm, event) => {
					if (
						!cm.state.completionActive &&
						!AUTOCOMPLETE_EXCLUDED_KEYS.has(event.key)
					) {
						codeMirror.showHint();
					}
				});

				if (folded) {
					codeMirror.operation(() => {
						for (
							let line = codeMirror.firstLine() + 1;
							line <= codeMirror.lastLine() - 1;
							++line
						) {
							codeMirror.foldCode({ch: 0, line}, null, 'fold');
						}
					});
				}

				editorRef.current = codeMirror;
			}
		}, [editorWrapperRef]); // eslint-disable-line

		return (
			<div
				className="codemirror-editor-wrapper"
				ref={editorWrapperRef}
			></div>
		);
	}
);

export default CodeMirrorEditor;
