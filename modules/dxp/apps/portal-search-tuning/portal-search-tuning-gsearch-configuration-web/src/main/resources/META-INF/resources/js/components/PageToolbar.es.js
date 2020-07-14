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
import {ClayInput} from '@clayui/form';
import ClayLink from '@clayui/link';
import ClayManagementToolbar from '@clayui/management-toolbar';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useRef, useState} from 'react';

import ThemeContext from '../ThemeContext.es';

export default function PageToolbar({
	initialTitle,
	onCancel,
	onPublish,
	submitDisabled,
}) {
	const inputRef = useRef(null);

	const [showEditor, setShowEditor] = useState(false);
	const [title, setTitle] = useState(initialTitle);

	const {namespace} = useContext(ThemeContext);

	useClickOutside(inputRef);

	useEffect(() => {
		if (showEditor) {
			inputRef.current.focus();
		}
	}, [showEditor]);

	function onClickEdit() {
		setShowEditor(true);
	}

	function useClickOutside(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowEditor(false);
				}
			}

			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	}

	return (
		<ClayManagementToolbar
			aria-label={Liferay.Language.get('save')}
			className="page-toolbar-root"
		>
			<ClayManagementToolbar.ItemList>
				<ClayManagementToolbar.Item></ClayManagementToolbar.Item>
			</ClayManagementToolbar.ItemList>

			<ClayManagementToolbar.ItemList expand>
				{showEditor ? (
					<ClayInput
						aria-label="title"
						className="form-control input-group-inset"
						id={`${namespace}title`}
						onChange={(event) => setTitle(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								setShowEditor(false);
							}
						}}
						placeholder={Liferay.Language.get('untitled')}
						ref={inputRef}
						type="text"
						value={title}
					/>
				) : (
					<div
						className="bold configuration-title"
						onClick={onClickEdit}
					>
						{title ? (
							title
						) : (
							<span className="italic secondary">
								{Liferay.Language.get('untitled')}
							</span>
						)}
						<input
							id={`${namespace}title`}
							name={`${namespace}title`}
							type="hidden"
							value={title}
						/>
					</div>
				)}
			</ClayManagementToolbar.ItemList>

			<ClayManagementToolbar.ItemList>
				<ClayManagementToolbar.Item>
					<ClayLink
						displayType="secondary"
						href={onCancel}
						outline="secondary"
					>
						{Liferay.Language.get('cancel')}
					</ClayLink>
				</ClayManagementToolbar.Item>

				<ClayManagementToolbar.Item>
					<ClayButton
						disabled={submitDisabled && !title}
						onClick={onPublish}
						small
						type="submit"
					>
						{Liferay.Language.get('save')}
					</ClayButton>
				</ClayManagementToolbar.Item>
			</ClayManagementToolbar.ItemList>
		</ClayManagementToolbar>
	);
}

PageToolbar.propTypes = {
	initialTitle: PropTypes.string,
	onCancel: PropTypes.string.isRequired,
	onPublish: PropTypes.func.isRequired,
	submitDisabled: PropTypes.bool,
};
