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

import {fetch, navigate} from 'frontend-js-web';
import {PropTypes} from 'prop-types';
import React, {useCallback, useContext, useRef, useState} from 'react';

import ThemeContext from '../ThemeContext';
import Builder from './Builder';
import PageToolbar from './PageToolbar';
import Sidebar from './Sidebar';

const DEFAULT_FRAGMENT_INDEX = 0;

export default function ConfigurationSetForm({
	availableLocales = [],
	configurationId,
	configurationType,
	initialTitleTranslations = {},
	redirectURL = '',
	submitFormURL = '',
}) {
	const {namespace} = useContext(ThemeContext);

	const [showSidebar] = useState(true);

	const form = useRef();

	const queryFragments = [
		{
			description:
				'Broadest query catching documents matching any keyword. Title is given more boost among the fields. Query has the neutral boost of 1.0.',
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
			title: {en_US: 'Matches any keyword'},
		},
		{
			description: 'Boost content last modified within a time frame.',
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
			title: {en_US: 'Freshness'},
		},
		{
			description: "Boost content created closer to user's location.",
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
			title: {en_US: "User's Geolocation"},
		},
	];

	const [selectedFragments, setSelectedFragments] = useState([
		{
			...queryFragments[DEFAULT_FRAGMENT_INDEX],
			jsonString: JSON.stringify(
				queryFragments[DEFAULT_FRAGMENT_INDEX].json,
				null,
				'\t'
			),
		},
	]);

	function addFragment(fragment) {
		setSelectedFragments([
			{
				...fragment,
				jsonString: JSON.stringify(fragment.json, null, '\t'),
			},
			...selectedFragments,
		]);
	}

	function deleteFragment(index) {
		setSelectedFragments(
			selectedFragments.filter((item, idx) => idx !== index)
		);
	}

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			const formData = new FormData(form.current);

			formData.append(
				`${namespace}clauseConfiguration`,
				JSON.stringify(queryFragments)
			);
			formData.append(`${namespace}type`, configurationType);
			formData.append(
				`${namespace}searchConfigurationId`,
				configurationId
			);
			formData.append(`${namespace}redirect`, redirectURL);

			fetch(submitFormURL, {
				body: formData,
				method: 'POST',
			})
				.then((response) => response.json())
				.then((responseContent) => {
					console.log(responseContent);

					navigate(redirectURL);
				})
				.catch(() => {
					// Show errors
				});
		},
		[
			configurationId,
			configurationType,
			namespace,
			queryFragments,
			redirectURL,
			submitFormURL,
		]
	);

	function updateFragment(index, fragment) {
		setSelectedFragments([
			...selectedFragments.slice(0, index),
			fragment,
			...selectedFragments.slice(index + 1),
		]);
	}

	return (
		<form ref={form}>
			<PageToolbar
				availableLocales={availableLocales}
				initialTitleTranslations={initialTitleTranslations}
				onCancel={redirectURL}
				onSubmit={handleSubmit}
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
					selectedFragments={selectedFragments}
					updateFragment={updateFragment}
				/>
			</div>
		</form>
	);
}

ConfigurationSetForm.propTypes = {
	availableLocales: PropTypes.arrayOf(PropTypes.object),
	initialTitleTranslations: PropTypes.object,
	redirectURL: PropTypes.string,
	submitFormURL: PropTypes.string,
};
