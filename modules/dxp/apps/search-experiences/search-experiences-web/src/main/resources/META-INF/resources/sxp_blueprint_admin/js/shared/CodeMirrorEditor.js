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

import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/javascript/javascript';
import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import CodeMirror from 'codemirror';
import React, {useEffect, useRef} from 'react';

const MODES = {
	json: {
		name: 'JSON',
		type: 'application/json',
	},
};

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
			}
			else {
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
			showRefreshButton,
			readOnly = false,
			refreshCallback,
			value = '',
		},
		ref
	) => {
		const innerRef = useRef(ref);
		const editorWrapperRef = useRef();
		const editorRef = useCombinedRefs(ref, innerRef);

		const [updateValue, forceUpdate] = React.useReducer((x) => x + 1, 0);

		useEffect(() => {
			if (editorWrapperRef.current) {
				editorWrapperRef.current.innerHTML = '';

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
					indentWithTabs: true,
					inputStyle: 'contenteditable',
					lineNumbers: true,
					lineWrapping,
					matchBrackets: true,
					mode: {globalVars: true, name: MODES[mode].type},
					readOnly,
					tabSize: 2,
					value,
				});

				codeMirror.on('change', (cm) => {
					onChange(cm.getValue());
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
		}, [editorWrapperRef, updateValue]); // eslint-disable-line

		/**
		 * Handles refreshing the editor with the latest value.
		 * `refreshCallback` is used to do any value transformations before it
		 * is set to the editor.
		 */
		const _handleRefresh = () => {
			if (refreshCallback) {
				refreshCallback();
			}

			forceUpdate();
		};

		return (
			<div className="codemirror-editor-root">
				{showRefreshButton && (
					<ClayButton
						className="refresh-button"
						displayType="secondary"
						onClick={_handleRefresh}
						small
					>
						<span className="inline-item inline-item-before">
							<ClayIcon symbol="reload" />
						</span>

						{Liferay.Language.get('refresh')}
					</ClayButton>
				)}

				<div
					className="codemirror-editor-wrapper"
					ref={editorWrapperRef}
				/>
			</div>
		);
	}
);

export default CodeMirrorEditor;
