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

import {fireEvent, render, within} from '@testing-library/react';
import React from 'react';

import EditSXPBlueprintForm from '../../../src/main/resources/META-INF/resources/js/edit_sxp_blueprint/EditSXPBlueprintForm';
const Toasts = require('../../../src/main/resources/META-INF/resources/js/utils/toasts');
import {
	ENTITY_JSON,
	INDEX_FIELDS,
	INITIAL_CONFIGURATION,
	SEARCHABLE_TYPES,
	SELECTED_SXP_ELEMENTS,
	SXP_ELEMENT_OUTPUTS,
} from '../mocks/data';

import '@testing-library/jest-dom/extend-expect';

jest.mock(
	'../../../src/main/resources/META-INF/resources/js/shared/CodeMirrorEditor',
	() => ({onChange, value}) => (
		<textarea aria-label="text-area" onChange={onChange} value={value} />
	)
);

// Prevents "TypeError: Liferay.component is not a function" error on openToast

Toasts.openSuccessToast = jest.fn();
Liferay.ThemeDisplay = {getDefaultLanguageId: () => 'en_US'};

function renderEditSXPBlueprintForm(props) {
	return render(
		<EditSXPBlueprintForm
			blueprintId="1"
			blueprintType={0}
			entityJSON={ENTITY_JSON}
			indexFields={INDEX_FIELDS}
			initialConfigurationString={JSON.stringify(INITIAL_CONFIGURATION)}
			initialDescription={{}}
			initialSelectedSXPElementsString={JSON.stringify({
				query_configuration: [],
			})}
			initialTitle={{
				'en-US': 'Test Title',
			}}
			querySXPElements={SELECTED_SXP_ELEMENTS}
			redirectURL=""
			searchableTypes={SEARCHABLE_TYPES}
			{...props}
		/>
	);
}

describe('EditSXPBlueprintForm', () => {
	global.URL.createObjectURL = jest.fn();

	it('renders the configuration set form', () => {
		const {container} = renderEditSXPBlueprintForm();

		expect(container).not.toBeNull();
	});

	it('renders the query elements', () => {
		const {container} = renderEditSXPBlueprintForm({
			initialConfigurationString: JSON.stringify({
				...INITIAL_CONFIGURATION,
				query_configuration: SXP_ELEMENT_OUTPUTS,
			}),
			initialSelectedSXPElementsString: JSON.stringify({
				query_configuration: SELECTED_SXP_ELEMENTS,
			}),
		});

		const {getByText} = within(container.querySelector('.builder'));

		SELECTED_SXP_ELEMENTS.map((sxpElement) =>
			getByText(sxpElement.sxpElementTemplateJSON.title['en_US'])
		);
	});

	it('adds additional query element from sidebar', () => {
		const {container, queryAllByLabelText} = renderEditSXPBlueprintForm();

		const sxpElementCountBefore = container.querySelectorAll('.sxp-element')
			.length;

		fireEvent.mouseOver(queryAllByLabelText('add')[0]);

		fireEvent.click(queryAllByLabelText('add')[0]);

		const sxpElementCountAfter = container.querySelectorAll('.sxp-element')
			.length;

		expect(sxpElementCountAfter).toBe(sxpElementCountBefore + 1);
	});

	it('enables removal of additional query elements', () => {
		const {
			container,
			getAllByLabelText,
			getAllByText,
		} = renderEditSXPBlueprintForm({
			initialConfigurationString: JSON.stringify({
				...INITIAL_CONFIGURATION,
				query_configuration: SXP_ELEMENT_OUTPUTS,
			}),
			initialSelectedSXPElementsString: JSON.stringify({
				query_configuration: SELECTED_SXP_ELEMENTS,
			}),
		});

		const sxpElementCountBefore = container.querySelectorAll('.sxp-element')
			.length;

		fireEvent.click(getAllByLabelText('dropdown')[0]);

		fireEvent.click(getAllByText('remove')[0]);

		const sxpElementCountAfter = container.querySelectorAll('.sxp-element')
			.length;

		expect(sxpElementCountAfter).toBe(sxpElementCountBefore - 1);
	});
});
