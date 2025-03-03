/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useState} from 'react';

import '../../css/categorization/Categorization.scss';
import CategorizationHome from './CategorizationHome';
import EditCategorization from './vocabulary/EditCategorization';

import {
	Link,
	Route,
	Routes,
	BrowserRouter,
	useLocation
} from 'react-router-dom';

export default function CategorizationMainView() {

	return (
		<div className="categorization-section">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<CategorizationHome />} />
					<Route path="edit" element={<EditCategorization />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}