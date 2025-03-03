/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {openModal} from 'frontend-js-web';
import {FrontendDataSet} from '@liferay/frontend-data-set-web';
import React from 'react';

import { useNavigate } from "react-router-dom";

export default function VocabulariesView(
	onChangeView,
) {
	const navigate = useNavigate();

	const creationMenu = {
		primaryItems: [
			{
				label: Liferay.Language.get('add-vocabulary'),
				onClick: navigate('/edit'),
			},
		],
	};

	const views = [
		{
			contentRenderer: 'table',
			default: true,
			label: Liferay.Language.get('table'),
			name: 'table',
			thumbnail: 'table',
		},
	];

	const emptyState = {
		description: Liferay.Language.get(
			'vocabularies-are-needed-to-create-categories'
		),
		image: '/states/cms_empty_state.svg',
		title: Liferay.Language.get('no-vocabularies-yet'),
	};

	return (
		<FrontendDataSet
			//apiURL="o/headless-admin-taxonomy/v1.0/sites/{siteId}/taxonomy-vocabularies"
			creationMenu={creationMenu}
			emptyState={emptyState}
			showManagementBar={false}
			showSearch={false}
			views={views}
		/>
	);
}
