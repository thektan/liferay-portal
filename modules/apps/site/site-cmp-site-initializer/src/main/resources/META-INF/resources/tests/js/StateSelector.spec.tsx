/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import '@testing-library/jest-dom';
import {fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';

import StateSelector from '../../js/components/StateSelector';

const mockStates = [
	{key: 'blocked', name: 'Blocked', nextStates: ['done', 'inProgress']},
	{key: 'done', name: 'Done', nextStates: ['inProgress']},
	{key: 'inProgress', name: 'In Progress', nextStates: ['blocked', 'done']},
	{
		key: 'notStarted',
		name: 'Not Started',
		nextStates: ['blocked', 'inProgress'],
	},
];

let resolvePromise: (value: void | PromiseLike<void>) => void;

const mockOnChange = jest.fn(
	() =>
		new Promise<void>((value) => {
			resolvePromise = value;
		})
);

describe('StateSelector', () => {
	it('renders with initial state', () => {
		const {getByText} = render(
			<StateSelector
				initialSelectedKey="notStarted"
				onChange={mockOnChange}
				states={mockStates}
			/>
		);

		expect(getByText('Not Started')).toBeInTheDocument();
	});

	it('calls onChange when selection changes', () => {
		const {getByText} = render(
			<StateSelector
				initialSelectedKey="notStarted"
				onChange={mockOnChange}
				states={mockStates}
			/>
		);

		const trigger = getByText('Not Started');

		fireEvent.click(trigger);

		const option = getByText('In Progress');

		fireEvent.click(option);

		expect(mockOnChange).toHaveBeenCalled();
	});

	it('updates next states in the specific display order', async () => {
		const {getAllByRole, getByText} = render(
			<StateSelector
				initialSelectedKey="notStarted"
				onChange={mockOnChange}
				states={mockStates}
			/>
		);

		fireEvent.click(getByText('Not Started'));

		let options = getAllByRole('option').map(
			(option) => option.textContent
		);

		expect(options.length).toBe(3);
		expect(options[0]).toBe('Not Started');
		expect(options[1]).toBe('In Progress');
		expect(options[2]).toBe('Blocked');

		fireEvent.click(getByText('In Progress'));

		await waitFor(() => resolvePromise());

		fireEvent.click(getByText('In Progress'));

		options = getAllByRole('option').map((option) => option.textContent);

		expect(options.length).toBe(3);
		expect(options[0]).toBe('In Progress');
		expect(options[1]).toBe('Blocked');
		expect(options[2]).toBe('Done');

		fireEvent.click(getByText('Blocked'));

		await waitFor(() => resolvePromise());

		fireEvent.click(getByText('Blocked'));

		options = getAllByRole('option').map((option) => option.textContent);

		expect(options.length).toBe(3);
		expect(options[0]).toBe('In Progress');
		expect(options[1]).toBe('Blocked');
		expect(options[2]).toBe('Done');

		fireEvent.click(getByText('Done'));

		await waitFor(() => resolvePromise());

		fireEvent.click(getByText('Done'));

		options = getAllByRole('option').map((option) => option.textContent);

		expect(options.length).toBe(2);
		expect(options[0]).toBe('In Progress');
		expect(options[1]).toBe('Done');
	});
});
