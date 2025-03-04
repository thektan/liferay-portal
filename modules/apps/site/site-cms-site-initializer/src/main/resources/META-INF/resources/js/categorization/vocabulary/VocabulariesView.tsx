/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {FrontendDataSet} from '@liferay/frontend-data-set-web';
import {openModal} from 'frontend-js-web';
import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

export default function VocabulariesView({
	history,
	onChangeView,
}: {
	history: RouteComponentProps['history'];
	onChangeView: Function;
}) {
	return (
		<FrontendDataSet

			// apiURL="o/headless-admin-taxonomy/v1.0/sites/{siteId}/taxonomy-vocabularies"

			creationMenu={{
				primaryItems: [
					{
						label: Liferay.Language.get('add-vocabulary'),
						onClick: () => history.push('/edit'),
					},
				],
			}}
			emptyState={{
				description: Liferay.Language.get(
					'vocabularies-are-needed-to-create-categories'
				),
				image: '/states/cms_empty_state.svg',
				title: Liferay.Language.get('no-vocabularies-yet'),
			}}
			showManagementBar={false}
			showSearch={false}
			views={[
				{
					contentRenderer: 'table',
					default: true,
					label: Liferay.Language.get('table'),
					name: 'table',
					thumbnail: 'table',
				},
			]}
		/>
	);
}
