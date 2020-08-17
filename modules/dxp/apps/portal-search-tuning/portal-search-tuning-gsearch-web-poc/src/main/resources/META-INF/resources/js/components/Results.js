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
import ClayEmptyState from '@clayui/empty-state';
import ClayIcon from '@clayui/icon';
import ClayList from '@clayui/list';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import ClaySticker from '@clayui/sticker';
import {PropTypes} from 'prop-types';
import React, {useEffect, useState} from 'react';

import {sub} from '../utils/language';
import Facet from './Facet';

const DEFAULT_ICON = 'web-content';

export default function Results({fetchResultsURL, query}) {
	const [activePage, setActivePage] = useState(1);
	const [selectedFacets, setSelectedFacets] = useState(Array(100));
	const [state, setState] = useState(() => ({
		error: false,
		loading: false,
		networkStatus: 4,
	}));

	useEffect(() => {
		setSelectedFacets(Array(100));
	}, [query]);

	const {resource} = useResource(
		{
			fetchDelay: 300,
			link: fetchResultsURL,
			onNetworkStatusChange: (status) =>
				setState({
					error: status === 5,
					loading: status < 4,
					networkStatus: status,
				}),
			variables: {q: query, start: activePage},
		},
		[activePage]
	);

	const hasResults = () =>
		!state.error && !state.loading && resource && resource.items.length;

	function updateSelectedFacets(facet, index) {
		setSelectedFacets([
			...selectedFacets.slice(0, index),
			facet,
			...selectedFacets.slice(index + 1),
		]);
	}

	return (
		<div className="search-results">
			{state.loading && <ClayLoadingIndicator />}

			{hasResults() ? (
				<>
					{resource.facets && (
						<Facet
							facets={resource.facets}
							selectedFacets={selectedFacets}
							updateSelectedFacets={updateSelectedFacets}
						/>
					)}

					<p>
						{sub(
							Liferay.Language.get('x-results-for-x'),
							[
								resource.items.length,
								<strong key={1}>{query}</strong>,
							],
							false
						)}
					</p>

					<ClayList className="search-results-list">
						{resource.items.map((item, index) => (
							<ClayList.Item flex key={index}>
								<ClayList.ItemField>
									<ClaySticker
										displayType="secondary"
										size="md"
									>
										<ClayIcon
											symbol={
												item.icon
													? item.icon
													: DEFAULT_ICON
											}
										/>
									</ClaySticker>
								</ClayList.ItemField>
								<ClayList.ItemField expand>
									<ClayList.ItemTitle>
										{item.title}
									</ClayList.ItemTitle>

									{(item.type ||
										item.author ||
										item.date) && (
										<ClayList.ItemText
											className="result-subtext"
											subtext
										>
											{item.type && (
												<span>
													<strong>{item.type}</strong>
												</span>
											)}

											{item.author && (
												<span>
													{Liferay.Language.get('by')}{' '}
													{item.author}
												</span>
											)}

											{item.date && (
												<span>
													{Liferay.Language.get('on')}{' '}
													{item.date}
												</span>
											)}
										</ClayList.ItemText>
									)}

									{item.description && (
										<ClayList.ItemText>
											{item.description}
										</ClayList.ItemText>
									)}
								</ClayList.ItemField>
							</ClayList.Item>
						))}
					</ClayList>
					<ClayPaginationWithBasicItems
						activePage={activePage}
						className="result-pagination"
						onPageChange={setActivePage}
						totalPages={resource.pagination.totalPages}
					/>
				</>
			) : (
				!state.loading && (
					<ClayEmptyState imgSrc="/o/admin-theme/images/states/empty_state.gif" />
				)
			)}
		</div>
	);
}

Results.propTypes = {
	fetchResultsURL: PropTypes.string,
	query: PropTypes.string,
};
