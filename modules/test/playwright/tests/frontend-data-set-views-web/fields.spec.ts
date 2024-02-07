/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {expect, mergeTests} from '@playwright/test';

import {loginTest} from '../../fixtures/loginTest';
import {dataSetManagerPagesTest} from './fixtures/dataSetManagerPageTest';

export const test = mergeTests(dataSetManagerPagesTest, loginTest);

test.beforeAll(async ({dataSetsPage, fieldsPage, viewsPage}) => {
	await dataSetsPage.goto();
	await viewsPage.goto();
	await fieldsPage.goto();
});

test('The fields tab can be reached', async ({page}) => {
	await expect(page.getByRole('heading', {name: 'Fields'})).toBeVisible();
});

test('The number of fields found is displayed in the search results bar', async ({
	dataSetsPage,
	fieldsPage,
	page,
	viewsPage,
}) => {
	await dataSetsPage.goto();
	await viewsPage.goto();
	await fieldsPage.goto();

	await page
		.getByRole('dialog', {name: 'Add Fields'})
		.getByPlaceholder('Search')
		.fill('fds');

	await expect(page.getByText('11 Results for fds')).toBeVisible();
});
