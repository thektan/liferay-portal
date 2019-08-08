import React from 'react';
import FilterDisplay from '../../../../src/main/resources/META-INF/resources/js/components/list/FilterDisplay.es';
import {fireEvent, render} from '@testing-library/react';

describe('FilterDisplay', () => {
	it('has the correct description', () => {
		const {getByText} = render(
			<FilterDisplay
				onClear={jest.fn()}
				searchBarTerm={'example'}
				totalResultsCount={250}
			/>
		);

		expect(getByText('250 Results for example')).toBeInTheDocument();
	});

	it('calls the onClear function when clicking on Clear', () => {
		const onClear = jest.fn();

		const {getByText} = render(
			<FilterDisplay
				onClear={onClear}
				searchBarTerm={'example'}
				totalResultsCount={250}
			/>
		);

		fireEvent.click(getByText('Clear'));

		expect(onClear).toHaveBeenCalledTimes(1);
	});
});
