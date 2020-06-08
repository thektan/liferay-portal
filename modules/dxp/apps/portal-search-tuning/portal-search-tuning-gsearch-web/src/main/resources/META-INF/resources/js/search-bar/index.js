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

import ClayForm, {ClayInput} from '@clayui/form';
import React, {useEffect, useState} from 'react';

import {STORAGE, getStorageKey, useSessionStorage} from '../utils/storage';

export default function ({searchKey}) {
	const [requestStorageData, setRequestStorageData] = useSessionStorage(
		getStorageKey(STORAGE.REQUEST, searchKey)
	);

	const [query, setQuery] = useState('');

	useEffect(() => {
		if (requestStorageData && requestStorageData.query) {
			setQuery(requestStorageData.query);
		}
	}, [requestStorageData]);

	function handleQueryChange(event) {
		setQuery(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		const prevRequestStorageData = requestStorageData || {};

		setRequestStorageData({...prevRequestStorageData, query});

		// Update search url

		const currentURL = new URL(window.location.href);

		currentURL.searchParams.set('q', query);

		history.pushState(null, '', currentURL.pathname + currentURL.search);
	}

	return (
		<ClayForm onSubmit={handleSubmit}>
			<ClayInput onChange={handleQueryChange} value={query} />
		</ClayForm>
	);
}
