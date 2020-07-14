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

import ClayLayout from '@clayui/layout';
import React from 'react';

import Fragment from './Fragment';

export default function Builder() {
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
			title: 'freshness',
		},
		{
			description: "boost-content-created-closer-to-user's-location",
			icon: 'geolocation',
			title: "user's-geolocation",
		},
	];

	return (
		<ClayLayout.ContainerFluid className="builder" size="md">
			<ClayLayout.SheetHeader className="bold configuration-header">
				{Liferay.Language.get('builder')}
			</ClayLayout.SheetHeader>

			{queryFragments.map((item, index) => {
				return (
					<Fragment
						deleteURL={item.deleteURL}
						description={item.description}
						icon={item.icon}
						key={index}
						title={item.title}
					/>
				);
			})}
		</ClayLayout.ContainerFluid>
	);
}
