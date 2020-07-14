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
import React from 'react';

import ConfigurationFragments from './ConfigurationFragments.es';
import PageToolbar from './PageToolbar.es';

export default function ConfigurationSetForm({
	cancelURL = '',
	formName = '',
	title = '',
}) {
	function handlePublish() {
		submitForm(document[formName]);
	}

	return (
		<>
			<PageToolbar
				initialTitle={title}
				onCancel={cancelURL}
				onPublish={handlePublish}
				submitDisabled={true} //will depend on required values
			/>

			<ClayLayout.ContainerFluid
				className="configuration-fragments configuration-set-container"
				size="md"
			>
				<ConfigurationFragments />
			</ClayLayout.ContainerFluid>
		</>
	);
}

ConfigurationSetForm.propTypes = {
	cancelURL: PropTypes.string,
	formName: PropTypes.string,
	title: PropTypes.string,
};
