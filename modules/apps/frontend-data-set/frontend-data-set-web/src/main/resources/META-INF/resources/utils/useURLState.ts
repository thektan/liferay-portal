/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useCallback} from 'react';

import {EStateInURLSettings, IStateInURL, IStateInURLSetters} from './types';

// Logic from stateInURL.ts is now inlined here.

function getStateParamName(id: string): string {
	return `fds_state_${id}`;
}

function getStateFromURL(id: string): Partial<IStateInURL> | null {
	if (!Liferay.FeatureFlags['LPD-22473']) {
		return null;
	}

	const params = new URLSearchParams(window.location.search);

	const stateParam = params.get(getStateParamName(id));

	if (!stateParam) {
		return null;
	}

	let state = {};

	try {
		state = JSON.parse(stateParam);
	}
	catch (error) {
		return null;
	}

	return state;
}

function deepContains(subset: any, superset: any) {
	if (typeof subset !== 'object' || subset === null) {
		return subset === superset;
	}

	if (typeof superset !== 'object' || superset === null) {
		return false;
	}

	if (
		Array.isArray(subset) &&
		Array.isArray(superset) &&
		(subset.length > superset.length || !subset.length)
	) {
		return false;
	}

	for (const key of Object.keys(subset)) {
		if (!Object.prototype.hasOwnProperty.call(superset, key)) {
			return false;
		}

		if (!deepContains(subset[key], superset[key])) {
			return false;
		}
	}

	return true;
}

function contains(
	a: Partial<IStateInURL> | null,
	b: Partial<IStateInURL> | null
) {
	if (a === null || b === null) {
		return false;
	}

	return deepContains(a, b);
}

function writeStateInURL(
	id: string,
	state: Partial<IStateInURL>,
	settings: EStateInURLSettings
) {
	if (
		!state ||
		!Object.keys(state).length ||
		settings === EStateInURLSettings.OFF ||
		!Liferay.FeatureFlags['LPD-22473']
	) {
		return;
	}

	const currentState = getStateFromURL(id);

	if (contains(state, currentState)) {
		return;
	}

	const params = new URLSearchParams(window.location.search);

	params.set(
		getStateParamName(id),
		JSON.stringify({...(currentState || {}), ...state})
	);

	const path = `${window.location.pathname}?${params.toString()}`;

	const replaceState =
		settings === EStateInURLSettings.REPLACE || !currentState;

	if (Liferay.SPA && Liferay.SPA.app) {
		Liferay.SPA.app.browserPathBeforeNavigate = path;

		Liferay.SPA.app.updateHistory_(
			document.title,
			path,
			{
				...window.history.state,
				path,
				redirectPath: path,
				senna: true,
			},
			replaceState
		);

		return;
	}

	if (replaceState) {
		window.history.replaceState(
			{...window.history.state},
			document.title,
			path
		);
	}
	else {
		window.history.pushState(
			{...window.history.state},
			document.title,
			path
		);
	}
}

type StateInitializer = {
	[K in keyof IStateInURL]?: (value: IStateInURL[K]) => IStateInURL[K] | null;
};

type SetterConfig = {
	key: keyof IStateInURL;
	type: string;
};

function getInitializedState(
	id: string,
	stateInitializers?: StateInitializer
): Partial<IStateInURL> {
	const stateFromURL: Partial<IStateInURL> | null = getStateFromURL(id);

	const state: Partial<IStateInURL> = {};

	if (stateFromURL) {
		Object.assign(state, stateFromURL);

		if (stateInitializers) {
			for (const key of Object.keys(state) as Array<keyof IStateInURL>) {
				const stateInitializer = stateInitializers[key];
				const stateValue = state[key];

				if (stateInitializer && stateValue !== undefined) {
					const initializedValue = (stateInitializer as any)(
						stateValue
					);

					if (initializedValue !== null) {
						state[key] = initializedValue;
					}
					else {
						delete state[key];
					}
				}
			}
		}
	}

	return state;
}

function useURLState({
	id,
	stateInURLSettings,
	stateInitializers,
}: {
	id: string;
	stateInURLSettings: EStateInURLSettings;
	stateInitializers?: StateInitializer;
}): [() => Partial<IStateInURL>, (state: Partial<IStateInURL>) => void] {
	const getURLState = useCallback(
		() => getInitializedState(id, stateInitializers),
		[id, stateInitializers]
	);

	const writeURLState = useCallback(
		(state: Partial<IStateInURL>) => {
			writeStateInURL(id, state, stateInURLSettings);
		},
		[id, stateInURLSettings]
	);

	return [getURLState, writeURLState];
}

export default useURLState;
