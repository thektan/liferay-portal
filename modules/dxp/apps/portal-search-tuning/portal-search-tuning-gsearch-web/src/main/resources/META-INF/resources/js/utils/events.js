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

export const EVENTS = {
	REQUEST_CHANGE: 'GSEARCH_REQUEST_CHANGE',
	RESULTS_CHANGE: 'GSEARCH_RESULTS_CHANGE',
	STORAGE_CHANGE: 'GSEARCH_STORAGE_CHANGE',
};

/**
 * Dispatches an event that the search has changed and a new request is needed.
 * Used when a filter or query changes.
 * @param {Object} data The information to pass to the other widget(s).
 */
export const dispatchRequestChange = (data) => {
	console.log('dispatchEvent:REQUEST_CHANGE', data);

	window.dispatchEvent(
		new CustomEvent(EVENTS.REQUEST_CHANGE, {detail: data})
	);
};

/**
 * Dispatches an event that the results have changed. This helps other widgets
 * display information based on results such as metadata.
 * @param {Object} data The information to pass to the other widget(s).
 */
export const dispatchResultsChange = (data) => {
	console.log('dispatchEvent:RESULTS_CHANGE', data);

	window.dispatchEvent(
		new CustomEvent(EVENTS.RESULTS_CHANGE, {detail: data})
	);
};

/**
 * Dispatches an event that a value in the session storage has changed.
 * @param {Object} data The information to pass to the other widget(s).
 */
export const dispatchStorageChange = (data) => {
	console.log('dispatchEvent:STORAGE_CHANGE', data);

	window.dispatchEvent(
		new CustomEvent(EVENTS.STORAGE_CHANGE, {detail: data})
	);
};
