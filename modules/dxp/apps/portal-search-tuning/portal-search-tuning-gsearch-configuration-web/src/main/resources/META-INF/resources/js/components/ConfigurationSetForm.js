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

import ClayLayout from '@clayui/layout';
import {PropTypes} from 'prop-types';
import React, {useState} from 'react';

import ConfigurationFragments from './ConfigurationFragments';
import PageToolbar from './PageToolbar';
import Sidebar from './Sidebar';

export default function ConfigurationSetForm({
	cancelURL = '',
	formName = '',
	titleTranslations = {},
}) {
	const [showSidebar] = useState(true);

	function handlePublish() {
		submitForm(document[formName]);
	}

	return (
		<>
			<PageToolbar
				onCancel={cancelURL}
				onPublish={handlePublish}
				submitDisabled={false} //will depend on required values
				titleTranslations={titleTranslations}
			/>

			{showSidebar && <Sidebar />}

			<div
				className={`configuration-fragments ${
					showSidebar ? 'shifted' : ''
				}`}
			>
				<ClayLayout.ContainerFluid
					className="configuration-set-container"
					size="md"
				>
					<ConfigurationFragments />
				</ClayLayout.ContainerFluid>
			</div>
		</>
	);
}

ConfigurationSetForm.propTypes = {
	cancelURL: PropTypes.string,
	formName: PropTypes.string,
	titleTranslations: PropTypes.object,
};
