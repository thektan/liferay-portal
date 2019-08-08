import ClayMultiselect from '../../../../src/main/resources/META-INF/resources/js/components/shared/ClayMultiselect.es';
import React from 'react';
import {render} from '@testing-library/react';

describe('ClayMultiselect', () => {
	it('renders', () => {
		const {container} = render(<ClayMultiselect />);

		expect(container.firstChild).not.toBeNull();
	});
});
