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
import React, {useRef, useState} from 'react';

class AceEditor extends React.Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();
	}

	componentDidMount() {
		AUI().use('aui-ace-editor', (A) => {
			const editor = new A.AceEditor({
				boundingBox: this.container.current,
				highlightActiveLine: false,
				mode: 'json',
				readOnly: 'false',
				tabSize: 4,
				value: this.props.json,
				width: '100%',
			}).render();

			editor.on('render', () => {
				this.props.onRender({
					editorElement: document.querySelector('.ace_editor'),
					editorTextInput: document.querySelector('.ace_text-input'),
				});
			});
		});
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div className="lfr-source-editor-code" ref={this.container}></div>
		);
	}
}

AceEditor.propTypes = {
	json: PropTypes.string,
	onRender: PropTypes.func,
};

export default function Fragment({deleteURL, description, icon, json, title}) {
	const [active, setActive] = useState(false);
	const [expand, setExpand] = useState(true);

	const editorElementRef = useRef();
	const editorTextInputRef = useRef();

	return (
		<div className="configuration-fragment" key={title}>
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
							<ClayDropDown.Item href={deleteURL}>
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

			<div className="configuration-editor">
				<AceEditor
					json={json}
					onRender={({editorElement, editorTextInput}) => {
						editorElementRef.current = editorElement;
						editorTextInputRef.current = editorTextInput;
					}}
				/>
			</div>
		</div>
	);
}

Fragment.propTypes = {
	deleteURL: PropTypes.string,
	description: PropTypes.string,
	icon: PropTypes.string,
	json: PropTypes.string,
	title: PropTypes.string,
};
