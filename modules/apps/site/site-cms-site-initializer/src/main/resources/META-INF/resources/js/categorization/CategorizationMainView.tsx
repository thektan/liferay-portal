/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useState} from 'react';

import '../../css/categorization/Categorization.scss';
import CategorizationToolbar from './CategorizationToolbar';
import TagsView from './tags/TagsView';
import VocabulariesView from './vocabulary/VocabulariesView';

export default function CategorizationMainView() {
	const TABS = {
		tags: Liferay.Language.get('Tags'),
		vocabularies: Liferay.Language.get('Vocabularies'),
	};
	const [tab, setTab] = useState('vocabularies');

	const handleTabChange = (tab) => {
		setTab(tab);
	};

	const renderTabContent = () => {
		switch (tab) {
			case 'tags':
				return <TagsView />;
			default:
				return <VocabulariesView />;
		}
	};

	return (
		<div className="categorization-section">
			<CategorizationToolbar
				onChangeTab={handleTabChange}
				tab={tab}
				tabs={TABS}
			/>

			{renderTabContent()}
		</div>
	);
}
