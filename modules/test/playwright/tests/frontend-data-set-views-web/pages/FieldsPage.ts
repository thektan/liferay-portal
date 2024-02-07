/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Page} from '@playwright/test';

import {ViewsPage} from './ViewsPage';

export class FieldsPage {
	readonly viewsPage: ViewsPage;
	readonly page: Page;

	constructor(page: Page) {
		this.viewsPage = new ViewsPage(page);
		this.page = page;
	}

	async goto() {
		await this.viewsPage.goto();
		await this.viewsPage.gotoTestDataSetView();

		await this.page.getByRole('button', {name: 'Fields'}).click();
	}
}
