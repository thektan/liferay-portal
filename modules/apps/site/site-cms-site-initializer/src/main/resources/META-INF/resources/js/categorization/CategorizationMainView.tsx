/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from 'react';

import '../../css/categorization/Categorization.scss';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import CategorizationHome from './CategorizationHome';
import EditCategorization from './vocabulary/EditCategorization';

export default function CategorizationMainView() {
	return (
		<div className="categorization-section">
			<BrowserRouter>
				<Switch>
					<Route component={CategorizationHome} path="/" />

					<Route component={EditCategorization} path="edit" />
				</Switch>
			</BrowserRouter>
		</div>
	);
}
