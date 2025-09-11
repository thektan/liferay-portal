/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useCallback} from 'react';

import {getStateFromURL, writeStateInURL} from './stateInURL';
import {EStateInURLSettings, IStateInURL, IStateInURLSetters} from './types';

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
	setters,
	stateInURLSettings,
	stateInitializers,
}: {
	id: string;
	setters: Array<SetterConfig>;
	stateInURLSettings: EStateInURLSettings;
	stateInitializers?: StateInitializer;
}): [Partial<IStateInURL>, IStateInURLSetters, () => Partial<IStateInURL>] {

	// Part 1: Get initial state from URL

	const initialState = getInitializedState(id, stateInitializers);

	// Part 2: Create setters

	const stateSetters = setters.reduce((acc, {key, type}) => {
		acc[key] = (value: any) => (viewsDispatch: Function) => {
			viewsDispatch({type, value});

			const newState: Partial<IStateInURL> = {
				[key]: value,
			};

			writeStateInURL(id, newState, stateInURLSettings);
		};

		return acc;
	}, {} as IStateInURLSetters);

	const getCurrentURLState = useCallback(
		() => getInitializedState(id, stateInitializers),
		[id, stateInitializers]
	);

	return [initialState, stateSetters, getCurrentURLState];
}

export default useURLState;
