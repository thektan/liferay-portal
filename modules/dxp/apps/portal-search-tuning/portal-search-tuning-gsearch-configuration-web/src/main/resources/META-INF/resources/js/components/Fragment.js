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

const DEFAULT_LANGUAGE = 'en_US';

function AceEditor({onChange, value}) {
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

			const session = editor.getSession();

			session.on('change', () => {
				onChange(editor.get('value'));
			});
		});
	}, [onChange, value]);

	return <div className="lfr-source-editor-code" ref={container}></div>;
}

AceEditor.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
};

export default function Fragment({
	collapseAll,
	deleteFragment,
	description,
	disabled = false,
	icon,
	jsonString,
	title,
	updateJson,
}) {
	const [active, setActive] = useState(false);
	const [collapse, setCollapse] = useState(collapseAll);

	useEffect(() => {
		setCollapse(collapseAll);
	}, [collapseAll]);

	function handleChange(event) {
		updateJson(event.target.value);
	}

	function handleKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
		}
	}

	return (
		<div className="configuration-fragment sheet">
			<ClayList>
				<ClayList.Item flex>
					<ClayList.ItemField>
						<ClaySticker className="icon" displayType="secondary">
							<ClayIcon symbol={icon} />
						</ClaySticker>
					</ClayList.ItemField>

					<ClayList.ItemField expand>
						<ClayList.ItemTitle>
							{title[DEFAULT_LANGUAGE]}
						</ClayList.ItemTitle>
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
								disabled={disabled}
								onClick={deleteFragment}
							>
								{Liferay.Language.get('delete')}
							</ClayDropDown.Item>
						</ClayDropDown.ItemList>
					</ClayDropDown>
					<ClayList.ItemField>
						<ClayButton
							aria-label={
								!collapse
									? Liferay.Language.get('collapse')
									: Liferay.Language.get('expand')
							}
							className="component-action"
							displayType="unstyled"
							onClick={() => {
								setCollapse(!collapse);
							}}
						>
							<ClayIcon
								symbol={
									!collapse ? 'angle-down' : 'angle-right'
								}
							/>
						</ClayButton>
					</ClayList.ItemField>
				</ClayList.Item>
			</ClayList>

			{!collapse && (
				<div className="configuration-editor">
					<textarea
						aria-label={Liferay.Language.get('text-area')}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						value={jsonString}
					/>
				</div>
			)}
		</div>
	);
}

Fragment.propTypes = {
	collapseAll: PropTypes.bool,
	deleteFragment: PropTypes.func,
	description: PropTypes.string,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	jsonString: PropTypes.string,
	title: PropTypes.object,
	updateJson: PropTypes.func,
};
