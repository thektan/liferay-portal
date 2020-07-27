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

import ClayButton from '@clayui/button';
import ClayDropDown from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayList from '@clayui/list';
import ClaySticker from '@clayui/sticker';
import {PropTypes} from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';

const DEFAULT_FRAGMENT = 'matches-any-keyword';

function AceEditor({onChange, onRender, value}) {
	const container = useRef();

	useEffect(() => {
		AUI().use('aui-ace-editor', (A) => {
			const editor = new A.AceEditor({
				boundingBox: container.current,
				mode: 'json',
				readOnly: false,
				tabSize: 4,
				value,
				width: '100%',
			}).render();

			editor.on('render', () => {
				onRender({
					editorElement: document.querySelector('.ace_editor'),
					editorTextInput: document.querySelector('.ace_text-input'),
				});
			});

			const session = editor.getSession();

			session.on('change', () => {
				onChange(editor.get('value'));
			});
		});
	}, [onChange, onRender, value]);

	return <div className="lfr-source-editor-code" ref={container}></div>;
}

AceEditor.propTypes = {
	onChange: PropTypes.func,
	onRender: PropTypes.func,
	value: PropTypes.string,
};

export default function Fragment({
	collapse,
	deleteFragment,
	description,
	icon,
	json,
	title,
}) {
	const [active, setActive] = useState(false);
	const [expand, setExpand] = useState(true);

	const [value, setValue] = useState(JSON.stringify(json, null, '\t'));

	const editorElementRef = useRef();
	const editorTextInputRef = useRef();

	useEffect(() => {
		if (collapse) {
			setExpand(false);
		}
	}, [collapse]);

	return (
		<div className="configuration-fragment sheet" key={title}>
			<ClayList>
				<ClayList.Item flex>
					<ClayList.ItemField>
						<ClaySticker className="icon" displayType="secondary">
							<ClayIcon symbol={icon} />
						</ClaySticker>
					</ClayList.ItemField>

					<ClayList.ItemField expand>
						<ClayList.ItemTitle>{title}</ClayList.ItemTitle>
						<ClayList.ItemText subtext={true}>
							{description}
						</ClayList.ItemText>
					</ClayList.ItemField>

					<ClayDropDown
						active={active}
						alignmentPosition={3}
						onActiveChange={setActive}
						trigger={
							<ClayList.ItemField>
								<ClayButton
									aria-label={Liferay.Language.get(
										'dropdown'
									)}
									className="component-action"
									displayType="unstyled"
								>
									<ClayIcon symbol="ellipsis-v" />
								</ClayButton>
							</ClayList.ItemField>
						}
					>
						<ClayDropDown.ItemList>
							<ClayDropDown.Item
								disabled={title === DEFAULT_FRAGMENT}
								onClick={() => deleteFragment(title)}
							>
								{Liferay.Language.get('delete')}
							</ClayDropDown.Item>
						</ClayDropDown.ItemList>
					</ClayDropDown>
					<ClayList.ItemField>
						<ClayButton
							aria-label={Liferay.Language.get('expand')}
							className="component-action"
							displayType="unstyled"
							onClick={() => setExpand(!expand)}
						>
							<ClayIcon
								symbol={expand ? 'angle-down' : 'angle-right'}
							/>
						</ClayButton>
					</ClayList.ItemField>
				</ClayList.Item>
			</ClayList>

			{expand && (
				<div className="configuration-editor">
					<AceEditor
						onChange={(val) => setValue(val)}
						onRender={({editorElement, editorTextInput}) => {
							editorElementRef.current = editorElement;
							editorTextInputRef.current = editorTextInput;
						}}
						value={value}
					/>
				</div>
			)}
		</div>
	);
}

Fragment.propTypes = {
	collapse: PropTypes.number,
	deleteFragment: PropTypes.func,
	description: PropTypes.string,
	icon: PropTypes.string,
	json: PropTypes.object,
	title: PropTypes.string,
};
