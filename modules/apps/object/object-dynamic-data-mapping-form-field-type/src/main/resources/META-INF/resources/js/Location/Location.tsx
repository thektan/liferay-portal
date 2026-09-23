/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {ClayInput} from '@clayui/form';
import {useFormState} from 'data-engine-js-components-web';
import {LocalesDropdown} from 'dynamic-data-mapping-form-field-type';
import {ReactFieldBase as FieldBase} from 'dynamic-data-mapping-form-field-type/api';
import React, {useEffect, useMemo, useRef, useState} from 'react';

import {
	LocationValue,
	MAP_PROVIDER,
	MapProviderKey,
	parseLocationValue,
	stringifyLocationValue,
	useLocationMap,
} from './useLocationMap';

import './Location.scss';

import type {
	FieldChangeEventHandler,
	LocalizedValue,
} from 'dynamic-data-mapping-form-field-type';

interface BaseLocationProps {
	fieldName: string;
	googleMapsAPIKey?: string;
	id?: string;
	mapProviderKey?: MapProviderKey;
	name: string;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	[key: string]: unknown;
}

interface LocalizableLocationProps extends BaseLocationProps {
	localizedObjectField: true;
	onChange?: FieldChangeEventHandler<LocalizedValue<string>>;
	value?: LocalizedValue<string>;
}

interface NonLocalizableLocationProps extends BaseLocationProps {
	localizedObjectField?: false;
	onChange?: FieldChangeEventHandler<string>;
	value?: string;
}

type LocationProps = LocalizableLocationProps | NonLocalizableLocationProps;

interface LocationMapProps {
	children?: React.ReactNode;
	disabled?: boolean;
	googleMapsAPIKey?: string;
	id: string;
	mapProviderKey: MapProviderKey;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onLocationChange: (locationValue: LocationValue) => void;
	serializedValue?: string;
}

/**
 * Renders the map with its draggable pin and the address input. On Google
 * Maps the input offers Places suggestions. On OpenStreetMap it only shows
 * the address the pin resolves to, since Nominatim forbids autocomplete.
 */
const LocationMap = ({
	children,
	disabled,
	googleMapsAPIKey,
	id,
	mapProviderKey,
	onBlur,
	onFocus,
	onLocationChange,
	serializedValue,
}: LocationMapProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	// DDM field ids contain "$", which is not valid in a CSS id selector, and
	// the map looks its container up with querySelector.

	const mapElementId = `${id}_map`.replace(/[^\w-]/g, '_');

	const locationValue = useMemo(
		() => parseLocationValue(serializedValue),
		[serializedValue]
	);

	const [address, setAddress] = useState(locationValue?.address ?? '');

	useEffect(() => {
		setAddress(locationValue?.address ?? '');
	}, [locationValue]);

	const handlePositionChange = (newLocationValue: LocationValue) => {
		setAddress(newLocationValue.address);

		onLocationChange(newLocationValue);
	};

	useLocationMap({
		disabled,
		googleMapsAPIKey,
		inputRef,
		mapElementId,
		mapProviderKey,
		onPositionChange: handlePositionChange,
		value: locationValue,
	});

	return (
		<>
			{!disabled && (
				<div
					className="mb-3 object-field__location-map"
					id={mapElementId}
				/>
			)}

			<ClayInput.Group>
				<ClayInput.GroupItem>
					<ClayInput
						disabled={disabled}
						id={id}
						onBlur={onBlur}
						onChange={({target: {value}}) => setAddress(value)}
						onFocus={onFocus}
						readOnly={mapProviderKey !== MAP_PROVIDER.googleMaps}
						ref={inputRef}
						type="text"
						value={address}
					/>
				</ClayInput.GroupItem>

				{children}
			</ClayInput.Group>
		</>
	);
};

const LocalizableLocation = ({
	fieldName,
	googleMapsAPIKey,
	id,
	mapProviderKey = MAP_PROVIDER.openStreetMap,
	name,
	onBlur,
	onChange,
	onFocus,
	readOnly,
	value = {} as LocalizedValue<string>,
	...otherProps
}: LocalizableLocationProps) => {
	const {availableLocales, editingLanguageId} = useFormState();

	const disabled = readOnly || (otherProps.disabled as boolean);

	const handleLocationChange = (locationValue: LocationValue) => {
		onChange?.({
			target: {
				value: {
					...value,
					[editingLanguageId]: stringifyLocationValue(locationValue),
				},
			},
		});
	};

	return (
		<FieldBase
			{...otherProps}
			id={id ?? name}
			name={name}
			readOnly={disabled}
		>
			<LocationMap
				disabled={disabled}
				googleMapsAPIKey={googleMapsAPIKey}
				id={id ?? name}
				mapProviderKey={mapProviderKey}
				onBlur={onBlur}
				onFocus={onFocus}
				onLocationChange={handleLocationChange}
				serializedValue={value[editingLanguageId]}
			>
				<ClayInput.GroupItem shrink>
					<LocalesDropdown
						availableLocales={availableLocales}
						fieldName={fieldName}
						value={value}
					/>
				</ClayInput.GroupItem>
			</LocationMap>
		</FieldBase>
	);
};

const NonLocalizableLocation = ({
	googleMapsAPIKey,
	id,
	mapProviderKey = MAP_PROVIDER.openStreetMap,
	name,
	onBlur,
	onChange,
	onFocus,
	readOnly,
	value = '',
	...otherProps
}: NonLocalizableLocationProps) => {
	const [serializedValue, setSerializedValue] = useState(value);

	useEffect(() => {
		setSerializedValue(value);
	}, [value]);

	const disabled = readOnly || (otherProps.disabled as boolean);

	const handleLocationChange = (locationValue: LocationValue) => {
		const newValue = stringifyLocationValue(locationValue);

		setSerializedValue(newValue);

		onChange?.({target: {value: newValue}});
	};

	return (
		<FieldBase
			{...otherProps}
			id={id ?? name}
			name={name}
			readOnly={disabled}
		>
			<LocationMap
				disabled={disabled}
				googleMapsAPIKey={googleMapsAPIKey}
				id={id ?? name}
				mapProviderKey={mapProviderKey}
				onBlur={onBlur}
				onFocus={onFocus}
				onLocationChange={handleLocationChange}
				serializedValue={serializedValue}
			/>

			<input name={name} type="hidden" value={serializedValue} />
		</FieldBase>
	);
};

const Location = (props: LocationProps) =>
	props.localizedObjectField ? (
		<LocalizableLocation {...props} />
	) : (
		<NonLocalizableLocation {...props} />
	);

export default Location;
