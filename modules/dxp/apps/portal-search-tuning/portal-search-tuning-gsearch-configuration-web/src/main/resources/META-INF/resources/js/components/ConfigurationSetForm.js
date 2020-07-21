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

import {PropTypes} from 'prop-types';
import React, {useState} from 'react';

import Builder from './Builder';
import PageToolbar from './PageToolbar';
import Sidebar from './Sidebar';

export default function ConfigurationSetForm({
	cancelURL = '',
	formName = '',
	initialTitleTranslations = {},
}) {
	const [showSidebar] = useState(true);
	const [selectedFragments, setSelectedFragments] = useState([]);

	const queryFragments = [
		{
			description:
				'broadest-query-catching-documents-matching-any-keyword-title-is-given-more-boost-among-the-fields-query-has-the-neutral-boost-of-1.0',
			icon: 'vocabulary',
			json: {
				clauses: [
					{
						configuration: {
							boost: 20,
							field_name:
								'gsearch_locations_$_context.language_id_$',
							query: '$_geolocation.city_$',
						},
						occur: 'should',
						query_type: 'match',
					},
					{
						configuration: {
							boost: 10,
							field_name:
								'gsearch_locations_$_context.language_id_$',
							query: '$_geolocation.country_name_$',
						},
						occur: 'should',
						query_type: 'match',
					},
				],
				conditions: [],
				description:
					'Example of using geolocation clause condition and configuration variables. Requires the gsearch-geolocation module.',
				enabled: true,
			},
			title: 'matches-any-keyword',
		},
		{
			description: 'boost-content-last-modified-within-a-time-frame',
			icon: 'time',
			json: {
				clauses: [
					{
						configuration: {
							boost: 20,
							field_name:
								'gsearch_locations_$_context.language_id_$',
							query: '$_geolocation.city_$',
						},
						occur: 'should',
						query_type: 'match',
					},
					{
						configuration: {
							boost: 10,
							field_name:
								'gsearch_locations_$_context.language_id_$',
							query: '$_geolocation.country_name_$',
						},
						occur: 'should',
						query_type: 'match',
					},
				],
				conditions: [],
				description:
					'Example of using geolocation clause condition and configuration variables. Requires the gsearch-geolocation module.',
				enabled: true,
			},
			title: 'freshness',
		},
		{
			description: "boost-content-created-closer-to-user's-location",
			icon: 'geolocation',
			json: {
				clauses: [
					{
						configuration: {
							boost: 20,
							field_name:
								'gsearch_locations_$_context.language_id_$',
							query: '$_geolocation.city_$',
						},
						occur: 'should',
						query_type: 'match',
					},
					{
						configuration: {
							boost: 10,
							field_name:
								'gsearch_locations_$_context.language_id_$',
							query: '$_geolocation.country_name_$',
						},
						occur: 'should',
						query_type: 'match',
					},
				],
				conditions: [],
				description:
					'Example of using geolocation clause condition and configuration variables. Requires the gsearch-geolocation module.',
				enabled: true,
			},
			title: "user's-geolocation",
		},
	];

	const fragmentMap = queryFragments.reduce((acc, cur) => {
		return acc[cur.title] ? acc : {...acc, [cur.title]: cur};
	}, {});

	function addFragment(id) {
		if (!selectedFragments.includes(id)) {
			setSelectedFragments([...selectedFragments, id]);
		}
	}

	function deleteFragment(id) {
		setSelectedFragments(selectedFragments.filter((item) => item !== id));
	}

	function handlePublish() {
		submitForm(document[formName]);
	}

	return (
		<>
			<PageToolbar
				initialTitleTranslations={initialTitleTranslations}
				onCancel={cancelURL}
				onPublish={handlePublish} //will depend on required values
			/>

			{showSidebar && (
				<Sidebar
					addFragment={addFragment}
					queryFragments={queryFragments}
				/>
			)}

			<div className={`${showSidebar ? 'shifted' : ''}`}>
				<Builder
					deleteFragment={deleteFragment}
					selectedFragments={selectedFragments.map(
						(id) => fragmentMap[id]
					)}
				/>
			</div>
		</>
	);
}

ConfigurationSetForm.propTypes = {
	cancelURL: PropTypes.string,
	formName: PropTypes.string,
	initialTitleTranslations: PropTypes.object,
};
