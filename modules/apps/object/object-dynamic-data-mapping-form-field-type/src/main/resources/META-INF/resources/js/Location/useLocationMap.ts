/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {MapBase} from '@liferay/map-common';
import {
	GoogleMapsSearch,
	MapGoogleMaps,
	loadGoogleMaps,
} from '@liferay/map-google-maps';
import {MapOpenStreetMap} from '@liferay/map-openstreetmap';
import {RefObject, useEffect, useRef} from 'react';

export const MAP_PROVIDER = {
	googleMaps: 'GoogleMaps',
	openStreetMap: 'OpenStreetMap',
} as const;

export type MapProviderKey = (typeof MAP_PROVIDER)[keyof typeof MAP_PROVIDER];

export interface LocationCoordinates {
	lat: number;
	lng: number;
}

export interface LocationValue {
	address: string;
	location: LocationCoordinates;
}

interface MapPosition {
	address?: string;
	location: LocationCoordinates;
}

interface UseLocationMapProps {
	disabled?: boolean;
	googleMapsAPIKey?: string;
	inputRef: RefObject<HTMLInputElement>;
	mapElementId: string;
	mapProviderKey: MapProviderKey;
	onPositionChange: (locationValue: LocationValue) => void;
	value: LocationValue | null;
}

const {CONTROLS} = MapBase;

const MAP_CONTROLS = [
	CONTROLS.HOME,
	CONTROLS.PAN,
	CONTROLS.TYPE,
	CONTROLS.ZOOM,
];

function isSameLocation(
	position: MapPosition | undefined,
	locationValue: LocationValue
) {
	return (
		position?.location?.lat === locationValue.location.lat &&
		position?.location?.lng === locationValue.location.lng
	);
}

/**
 * Parses a stored value into an address with coordinates. Anything without
 * numeric coordinates is treated as empty.
 */
export function parseLocationValue(value: unknown): LocationValue | null {
	if (!value) {
		return null;
	}

	try {
		const parsed = typeof value === 'string' ? JSON.parse(value) : value;

		if (
			typeof parsed?.location?.lat === 'number' &&
			typeof parsed?.location?.lng === 'number'
		) {
			return {
				address: parsed.address ?? '',
				location: {lat: parsed.location.lat, lng: parsed.location.lng},
			};
		}
	}
	catch {
		return null;
	}

	return null;
}

export function stringifyLocationValue({address, location}: LocationValue) {
	return JSON.stringify({
		address,
		location: {lat: location.lat, lng: location.lng},
	});
}

/**
 * Creates the provider map inside the element with mapElementId, keeps its
 * pin on the given value and reports every position the user picks through
 * a dragged pin or, on Google Maps, a Places suggestion typed in inputRef.
 */
export function useLocationMap({
	disabled,
	googleMapsAPIKey,
	inputRef,
	mapElementId,
	mapProviderKey,
	onPositionChange,
	value,
}: UseLocationMapProps) {
	const mapRef = useRef<any>(null);
	const onPositionChangeRef = useRef(onPositionChange);
	const skipNextPositionChangeRef = useRef(false);
	const valueRef = useRef(value);

	useEffect(() => {
		onPositionChangeRef.current = onPositionChange;
	}, [onPositionChange]);

	useEffect(() => {
		if (disabled) {
			return;
		}

		let detachGoogleMapsListener: (() => void) | undefined;
		let search: any;

		const createMap = () => {
			const MapProvider =
				mapProviderKey === MAP_PROVIDER.googleMaps
					? MapGoogleMaps
					: MapOpenStreetMap;

			const initialValue = valueRef.current;

			// The map emits a first positionChange while it initializes with
			// a reverse geocoded address, which must not replace the stored
			// value.

			skipNextPositionChangeRef.current = true;

			const map = new MapProvider({
				boundingBox: `#${mapElementId}`,
				controls: MAP_CONTROLS,
				geolocation: true,
				position: initialValue
					? {
							address: initialValue.address,
							location: initialValue.location,
						}
					: {location: {lat: 0, lng: 0}},
			});

			map.on('positionChange', ({newVal}: {newVal: MapPosition}) => {
				if (skipNextPositionChangeRef.current) {
					skipNextPositionChangeRef.current = false;

					return;
				}

				onPositionChangeRef.current({
					address: newVal.address ?? '',
					location: newVal.location,
				});
			});

			if (
				mapProviderKey === MAP_PROVIDER.googleMaps &&
				inputRef.current
			) {
				search = new GoogleMapsSearch({inputNode: inputRef.current});

				// The map's search control only works with the input it builds
				// itself, so its search handler is attached to our autocomplete
				// and recenters and zooms the same way the built-in one does.

				search.on('search', map._handleSearchButtonClicked);
			}

			mapRef.current = map;
		};

		if (mapProviderKey === MAP_PROVIDER.googleMaps) {
			detachGoogleMapsListener = loadGoogleMaps(
				googleMapsAPIKey,
				createMap
			);
		}
		else {
			createMap();
		}

		return () => {
			detachGoogleMapsListener?.();

			search?.destructor();

			mapRef.current?.destructor();

			mapRef.current = null;
		};
	}, [disabled, googleMapsAPIKey, inputRef, mapElementId, mapProviderKey]);

	// Moves the pin when the value changes outside the map, such as when the
	// editing language changes. Positions the map itself reported already
	// match and are left alone.

	useEffect(() => {
		valueRef.current = value;

		const map = mapRef.current;

		if (!map || !value || isSameLocation(map.position, value)) {
			return;
		}

		skipNextPositionChangeRef.current = true;

		map.position = {address: value.address, location: value.location};
	}, [value]);
}
