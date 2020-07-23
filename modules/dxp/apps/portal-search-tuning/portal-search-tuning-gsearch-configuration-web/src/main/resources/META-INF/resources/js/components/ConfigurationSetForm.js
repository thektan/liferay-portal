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

import {PropTypes} from 'prop-types';
import React, {useState} from 'react';

import Builder from './Builder';
import PageToolbar from './PageToolbar';
import Sidebar from './Sidebar';

export default function ConfigurationSetForm({
	cancelURL = '',
	formName = '',
	initialTitleTranslations = {},
}) {
	const [showSidebar] = useState(true);

	function handlePublish() {
		submitForm(document[formName]);
	}

	return (
		<>
			<PageToolbar
				initialTitleTranslations={initialTitleTranslations}
				onCancel={cancelURL}
				onPublish={handlePublish} //will depend on required values
			/>

			{showSidebar && <Sidebar />}

			<div className={`${showSidebar ? 'shifted' : ''}`}>
				<Builder />
			</div>
		</>
	);
}

ConfigurationSetForm.propTypes = {
	cancelURL: PropTypes.string,
	formName: PropTypes.string,
	initialTitleTranslations: PropTypes.object,
};
