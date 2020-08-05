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

const QUERY_FRAGMENTS = [
	{
		clauses: [
			{
				configuration: {
					boost: 20,
					field_name: 'gsearch_locations_$_context.language_id_$',
					query: '$_geolocation.city_$',
				},
				occur: 'should',
				query_type: 'match',
			},
			{
				configuration: {
					boost: 10,
					field_name: 'gsearch_locations_$_context.language_id_$',
					query: '$_geolocation.country_name_$',
				},
				occur: 'should',
				query_type: 'match',
			},
		],
		conditions: [],
		description:
			'Broadest query catching documents matching any keyword. Title is given more boost among the fields. Query has the neutral boost of 1.0.',
		enabled: true,
		icon: 'vocabulary',
		title: {en_US: 'Matches any keyword'},
	},
	{
		clauses: [
			{
				configuration: {
					boost: 20,
					field_name: 'gsearch_locations_$_context.language_id_$',
					query: '$_geolocation.city_$',
				},
				occur: 'should',
				query_type: 'match',
			},
			{
				configuration: {
					boost: 10,
					field_name: 'gsearch_locations_$_context.language_id_$',
					query: '$_geolocation.country_name_$',
				},
				occur: 'should',
				query_type: 'match',
			},
		],
		conditions: [],
		description: 'Boost content last modified within a time frame.',
		enabled: true,
		icon: 'time',
		title: {en_US: 'Freshness'},
	},
	{
		clauses: [
			{
				configuration: {
					boost: 20,
					field_name: 'gsearch_locations_$_context.language_id_$',
					query: '$_geolocation.city_$',
				},
				occur: 'should',
				query_type: 'match',
			},
			{
				configuration: {
					boost: 10,
					field_name: 'gsearch_locations_$_context.language_id_$',
					query: '$_geolocation.country_name_$',
				},
				occur: 'should',
				query_type: 'match',
			},
		],
		conditions: [],
		description: "Boost content created closer to user's location.",
		enabled: true,
		icon: 'geolocation',
		title: {en_US: "User's Geolocation"},
	},
];

const DEFAULT_SELECTED_FRAGMENTS = [
	{
		...QUERY_FRAGMENTS[0],
		jsonString: JSON.stringify(QUERY_FRAGMENTS[0], null, '\t'),
	},
];

function ConfigurationSetForm({
	availableLocales = [],
	configurationId,
	configurationType,
	initialClauseConfiguration,
	initialTitle = {},
	redirectURL = '',
	submitFormURL = '',
}) {
	const {namespace} = useContext(ThemeContext);

	const [showSidebar] = useState(true);

	const form = useRef();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [selectedFragments, setSelectedFragments] = useState(
		configurationId !== '0'
			? initialClauseConfiguration.map((configString) => ({
					...JSON.parse(configString),
					jsonString: configString,
			  }))
			: DEFAULT_SELECTED_FRAGMENTS
	);

	function addFragment(fragment) {
		setSelectedFragments([
			{
				...fragment,
				jsonString: JSON.stringify(fragment, null, '\t'),
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

			setIsSubmitting(true);

			const formData = new FormData(form.current);

			// JSON needs to be stringified as an array. We have to parse the
			// jsonString first to avoid performing stringify twice.

			formData.append(
				`${namespace}clauseConfiguration`,
				JSON.stringify(
					selectedFragments.map((fragment) =>
						JSON.parse(fragment.jsonString)
					)
				)
			);
			formData.append(`${namespace}type`, configurationType);
			formData.append(
				`${namespace}searchConfigurationId`,
				configurationId
			);
			formData.append(`${namespace}redirect`, redirectURL);

			return fetch(submitFormURL, {
				body: formData,
				method: 'POST',
			})
				.then((response) => response.json())
				.then(() => {
					navigate(redirectURL);
				})
				.catch((errors) => {
					// Show errors

					console.log({errors});

					setIsSubmitting(false);
				});
		},
		[
			configurationId,
			configurationType,
			namespace,
			redirectURL,
			selectedFragments,
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
				initialTitle={initialTitle}
				isSubmitting={isSubmitting}
				onCancel={redirectURL}
				onSubmit={handleSubmit}
			/>

			{showSidebar && (
				<Sidebar
					addFragment={addFragment}
					queryFragments={QUERY_FRAGMENTS}
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
	configurationId: PropTypes.string,
	configurationType: PropTypes.number,
	initialClauseConfiguration: PropTypes.arrayOf(PropTypes.string),
	initialTitle: PropTypes.object,
	redirectURL: PropTypes.string,
	submitFormURL: PropTypes.string,
};

export default React.memo(ConfigurationSetForm);
