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

import {useResource} from '@clayui/data-provider';
import ClayList from '@clayui/list';
import React, {useEffect, useState} from 'react';

import {STORAGE, getStorageKey, useSessionStorage} from '../utils/storage';

export default function ({initialQueryTerms, searchKey}) {
	const [requestStorageData] = useSessionStorage(
		getStorageKey(STORAGE.REQUEST, searchKey)
	);

	// eslint-disable-next-line no-unused-vars
	const [_, setResultsStorageData] = useSessionStorage(
		getStorageKey(STORAGE.RESULTS, searchKey)
	);

	const [query, setQuery] = useState(initialQueryTerms);

	const [resourceState, setResourceState] = useState(() => ({
		error: false,
		loading: false,
	}));

	const {error, loading} = resourceState;

	useEffect(() => {
		if (!error && !loading && resource && resource.results) {
			setResultsStorageData(resource);
		} else {
			setResultsStorageData(null);
		}
	}, [error, loading, resource, setResultsStorageData]);

	useEffect(() => {
		if (requestStorageData && requestStorageData.query) {
			setQuery(requestStorageData.query);
		}
	}, [requestStorageData]);

	const {resource} = useResource({
		fetchDelay: 300,
		link: 'https://run.mocky.io/v3/7a185803-e31d-4173-a3fe-66ab7d2716af',
		onNetworkStatusChange: (status) =>
			setResourceState({
				error: status === 5,
				loading: status < 4,
			}),
		variables: {name: query},
	});

	const hasResults = () => !error && !loading && resource && resource.results;

	return (
		<div>
			<ClayList>
				{loading && (
					<ClayList.Item>
						<ClayList.ItemText>{'Loading...'}</ClayList.ItemText>
					</ClayList.Item>
				)}

				{error && !resource && (
					<ClayList.Item>
						<ClayList.ItemText>
							{'No results found'}
						</ClayList.ItemText>
					</ClayList.Item>
				)}

				{hasResults() ? (
					<>
						<p>
							{'Showing results for '}
							<strong>{query}</strong>
						</p>

						{resource.results.map((item) => (
							<ClayList.Item key={item.id}>
								<ClayList.ItemText>
									{item.name}
								</ClayList.ItemText>
							</ClayList.Item>
						))}
					</>
				) : (
					<p>{'No results found'}</p>
				)}
			</ClayList>
		</div>
	);
}
