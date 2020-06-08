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

import {useEventListener} from 'frontend-js-react-web';
import {useCallback, useState} from 'react';

import {EVENTS, dispatchStorageChange} from './events';

export const STORAGE = {
	REQUEST: 'GSEARCH_REQUEST',
	RESULTS: 'GSEARCH_RESULTS',
};

/**
 * Scopes to searchKey to handle multiple GSearch instances on the same page.
 * @param {String} storageKey One of the STORAGE constants
 * @param {String} searchKey Key from user-defined widget configuration
 */
export const getStorageKey = (storageKey, searchKey) => {
	return searchKey ? `${searchKey}_${storageKey}` : storageKey;
};

/**
 * Use the Web API sessionStorage
 * @param {String} key The key to use in the session storage
 * @param {Boolean} options.clearBeforeUnload Clear the key when page unloads
 */
export const useSessionStorage = (key, options = {clearBeforeUnload: true}) => {
	const storageValue = JSON.parse(sessionStorage.getItem(key)) || {};

	const [value, setValue] = useState(storageValue);

	// Saves the changed value to session storage. This does not use useEffect
	// to avoid dispatching the event multiple times.

	const updateValue = (newValue) => {
		sessionStorage.setItem(key, JSON.stringify(newValue));

		// This simple comparison is mainly to prevent dispatching an event when
		// current and new values are both null.

		if (value !== newValue) {
			dispatchStorageChange({key, value: newValue});
		}

		setValue(newValue);
	};

	// Sync values across uses of useSessionStorage in multiple instances

	const handleStorageChange = useCallback(
		({detail}) => {
			if (detail.key === key) {
				setValue(detail.value);
			}
		},
		[key]
	);

	useEventListener(EVENTS.STORAGE_CHANGE, handleStorageChange, false, window);

	// Clear session storage before navigating to new page to prevent stale
	// data from initially loading.

	const removeStorageKey = useCallback(() => {
		if (options.clearBeforeUnload) {
			sessionStorage.removeItem(key);
		}
	}, [key, options.clearBeforeUnload]);

	useEventListener('beforeunload', removeStorageKey, false, window);

	Liferay.on('beforeNavigate', removeStorageKey);

	return [value, updateValue];
};
