/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {getStateFromURL, writeStateInURL} from './stateInURL';
import {EStateInURLSettings, IStateInURL, IStateInURLSetters} from './types';

type StateInitializer = {
	[K in keyof IStateInURL]?: (value: IStateInURL[K]) => IStateInURL[K] | null;
};

type SetterConfig = {
	key: keyof IStateInURL;
	type: string;
};

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
}): [Partial<IStateInURL>, IStateInURLSetters] {

	// Part 1: Get initial state from URL

	const stateFromURL: Partial<IStateInURL> | null = getStateFromURL(id);

	const initialState: Partial<IStateInURL> = {};

	if (stateFromURL) {
		Object.assign(initialState, stateFromURL);

		if (stateInitializers) {
			for (const key of Object.keys(initialState) as Array<
				keyof IStateInURL
			>) {
				const stateInitializer = stateInitializers[key];
				const stateValue = initialState[key];

				if (stateInitializer && stateValue !== undefined) {
					const initializedValue = (stateInitializer as any)(
						stateValue
					);

					if (initializedValue !== null) {
						initialState[key] = initializedValue;
					}
					else {
						delete initialState[key];
					}
				}
			}
		}
	}

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

	return [initialState, stateSetters];
}

export default useURLState;
