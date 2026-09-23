/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import Location from '../../js/Location/Location';

const mockMapInstances: any[] = [];
const mockSearchInstances: any[] = [];

const RECIFE = {
	address: '35 Alfândega Street, Recife, Pernambuco',
	location: {lat: -8.0619, lng: -34.8711},
};

const MADRID = {
	address: 'P.º de la Castellana, 280, 28046 Madrid, Spain',
	location: {lat: 40.4764291, lng: -3.6858155},
};

jest.mock('@clayui/form', () => {
	const React = require('react');

	return {
		ClayInput: Object.assign(
			React.forwardRef(
				(
					{disabled, onBlur, onChange, onFocus, readOnly, value}: any,
					ref: any
				) =>
					React.createElement('input', {
						'data-testid': 'addressInput',
						disabled,
						onBlur,
						onChange,
						onFocus,
						readOnly,
						ref,
						value,
					})
			),
			{
				Group: ({children}: any) =>
					React.createElement('div', null, children),
				GroupItem: ({children}: any) =>
					React.createElement('div', null, children),
			}
		),
	};
});

jest.mock('@liferay/map-common', () => ({
	MapBase: {
		CONTROLS: {HOME: 'home', PAN: 'pan', TYPE: 'type', ZOOM: 'zoom'},
	},
}));

jest.mock('@liferay/map-google-maps', () => {
	class FakeEmitter {
		listeners: {[eventName: string]: Array<(payload: any) => void>} = {};

		destructor() {}

		emit(eventName: string, payload: any) {
			(this.listeners[eventName] ?? []).forEach((listener) =>
				listener(payload)
			);
		}

		on(eventName: string, listener: (payload: any) => void) {
			this.listeners[eventName] = [
				...(this.listeners[eventName] ?? []),
				listener,
			];
		}
	}

	class FakeMap extends FakeEmitter {
		config: any;
		private _position: any;

		constructor(config: any) {
			super();

			this.config = config;
			this._position = config.position;

			this._handleSearchButtonClicked =
				this._handleSearchButtonClicked.bind(this);

			mockMapInstances.push(this);
		}

		_handleSearchButtonClicked({position}: {position: any}) {
			this.position = position;
		}

		get position() {
			return this._position;
		}

		set position(position: any) {
			this.emit('positionChange', {
				newVal: {
					address: position.address,
					location: position.location,
				},
			});

			this._position = position;
		}
	}

	class FakeSearch extends FakeEmitter {
		inputNode: HTMLInputElement;

		constructor({inputNode}: {inputNode: HTMLInputElement}) {
			super();

			this.inputNode = inputNode;

			mockSearchInstances.push(this);
		}
	}

	return {
		GoogleMapsSearch: FakeSearch,
		MapGoogleMaps: FakeMap,
		loadGoogleMaps: jest.fn((_googleMapsAPIKey, callback) => {
			callback();

			return jest.fn();
		}),
	};
});

jest.mock('@liferay/map-openstreetmap', () => ({
	MapOpenStreetMap: jest.requireMock('@liferay/map-google-maps')
		.MapGoogleMaps,
}));

jest.mock('data-engine-js-components-web', () => ({
	useFormState: jest.fn(() => ({
		availableLocales: [
			{displayName: 'English (United States)', localeId: 'en_US'},
			{displayName: 'Portuguese (Brazil)', localeId: 'pt_BR'},
		],
		defaultLanguageId: 'en_US',
		editingLanguageId: 'pt_BR',
	})),
}));

jest.mock('dynamic-data-mapping-form-field-type', () => {
	const React = require('react');

	return {
		LocalesDropdown: () =>
			React.createElement('div', {'data-testid': 'localesDropdown'}),
	};
});

jest.mock('dynamic-data-mapping-form-field-type/api', () => {
	const React = require('react');

	return {
		ReactFieldBase: ({children}: any) =>
			React.createElement('div', null, children),
	};
});

describe('Location', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		mockMapInstances.length = 0;
		mockSearchInstances.length = 0;
	});

	it('emits the address and coordinates when the pin moves', () => {
		const onChange = jest.fn();

		render(
			<Location
				fieldName="address"
				mapProviderKey="OpenStreetMap"
				name="address"
				onChange={onChange}
			/>
		);

		const [map] = mockMapInstances;

		act(() => {
			map.position = {address: 'Somewhere', location: {lat: 0, lng: 0}};
		});

		onChange.mockClear();

		act(() => {
			map.position = RECIFE;
		});

		expect(onChange).toHaveBeenCalledWith({
			target: {value: JSON.stringify(RECIFE)},
		});
		expect(screen.getByTestId('addressInput')).toHaveValue(RECIFE.address);
	});

	it('ignores the position the map reports while it initializes', () => {
		const onChange = jest.fn();

		render(
			<Location
				fieldName="address"
				mapProviderKey="OpenStreetMap"
				name="address"
				onChange={onChange}
				value={JSON.stringify(RECIFE)}
			/>
		);

		const [map] = mockMapInstances;

		expect(map.config.position).toEqual(RECIFE);

		act(() => {
			map.position = {
				address: 'Reverse geocoded address',
				location: RECIFE.location,
			};
		});

		expect(onChange).not.toHaveBeenCalled();
		expect(screen.getByTestId('addressInput')).toHaveValue(RECIFE.address);
	});

	it('keeps the address input read-only on OpenStreetMap', () => {
		render(
			<Location
				fieldName="address"
				mapProviderKey="OpenStreetMap"
				name="address"
				onChange={jest.fn()}
			/>
		);

		expect(screen.getByTestId('addressInput')).toHaveAttribute('readonly');
		expect(mockSearchInstances).toHaveLength(0);
	});

	it('lets the user type an address on Google Maps', () => {
		render(
			<Location
				fieldName="address"
				googleMapsAPIKey="key"
				mapProviderKey="GoogleMaps"
				name="address"
				onChange={jest.fn()}
			/>
		);

		const input = screen.getByTestId('addressInput');

		expect(input).not.toHaveAttribute('readonly');

		fireEvent.change(input, {target: {value: 'Paseo de la Castellana'}});

		expect(input).toHaveValue('Paseo de la Castellana');
		expect(mockSearchInstances[0].inputNode).toBe(input);
	});

	it('moves the pin to the picked Google suggestion', () => {
		const onChange = jest.fn();

		render(
			<Location
				fieldName="address"
				googleMapsAPIKey="key"
				mapProviderKey="GoogleMaps"
				name="address"
				onChange={onChange}
			/>
		);

		const [map] = mockMapInstances;
		const [search] = mockSearchInstances;

		act(() => {
			map.position = {address: 'Somewhere', location: {lat: 0, lng: 0}};
		});

		act(() => {
			search.emit('search', {position: MADRID});
		});

		expect(onChange).toHaveBeenCalledWith({
			target: {value: JSON.stringify(MADRID)},
		});
		expect(screen.getByTestId('addressInput')).toHaveValue(MADRID.address);
	});

	it('shows the stored address', () => {
		render(
			<Location
				fieldName="address"
				mapProviderKey="OpenStreetMap"
				name="address"
				onChange={jest.fn()}
				value={JSON.stringify(RECIFE)}
			/>
		);

		expect(screen.getByTestId('addressInput')).toHaveValue(RECIFE.address);
	});

	it('stores the value under the editing language when localized', () => {
		const onChange = jest.fn();

		render(
			<Location
				fieldName="address"
				localizedObjectField
				mapProviderKey="OpenStreetMap"
				name="address"
				onChange={onChange}
				value={{en_US: JSON.stringify(RECIFE)}}
			/>
		);

		expect(screen.getByTestId('localesDropdown')).toBeInTheDocument();
		expect(screen.getByTestId('addressInput')).toHaveValue('');

		const [map] = mockMapInstances;

		act(() => {
			map.position = {address: 'Somewhere', location: {lat: 0, lng: 0}};
		});

		act(() => {
			map.position = MADRID;
		});

		expect(onChange).toHaveBeenCalledWith({
			target: {
				value: {
					en_US: JSON.stringify(RECIFE),
					pt_BR: JSON.stringify(MADRID),
				},
			},
		});
	});

	it('uses a CSS-safe id for the map container', () => {
		const name = '_ns_ddm$$address$xEpVTXMf$0$$en_US';

		render(
			<Location
				fieldName="address"
				mapProviderKey="OpenStreetMap"
				name={name}
				onChange={jest.fn()}
			/>
		);

		const [map] = mockMapInstances;

		expect(map.config.boundingBox).not.toContain('$');
		expect(
			document.querySelector(map.config.boundingBox)
		).toBeInTheDocument();
	});
});
