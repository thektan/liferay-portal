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

import {ClayIconSpriteContext} from '@clayui/icon';
import {
	STORYBOOK_CONSTANTS,
	StorybookAddonActions,
	StorybookAddonKnobs,
	StorybookReact,
} from 'liferay-npm-scripts/src/storybook';
import React from 'react';

import '../../src/main/resources/META-INF/resources/css/main.scss';

import ClayLayout from '@clayui/layout';

import Builder from '../../src/main/resources/META-INF/resources/js/components/Builder';
import ConfigurationSetForm from '../../src/main/resources/META-INF/resources/js/components/ConfigurationSetForm';
import Fragment from '../../src/main/resources/META-INF/resources/js/components/Fragment';
import PageToolbar from '../../src/main/resources/META-INF/resources/js/components/PageToolbar';
import Sidebar from '../../src/main/resources/META-INF/resources/js/components/Sidebar';

const {addDecorator, storiesOf} = StorybookReact;
const {action} = StorybookAddonActions;
const {withKnobs} = StorybookAddonKnobs;

addDecorator(withKnobs);

addDecorator((storyFn) => {
	const context = {
		namespace:
			'_com_liferay_portal_search_tuning_gsearch_configuration_web_internal_portlet_SearchConfigurationAdminPortlet_',
		spritemap: STORYBOOK_CONSTANTS.SPRITEMAP_PATH,
	};

	return (
		<ClayIconSpriteContext.Provider value={context.spritemap}>
			<div className="configuration-set-root">{storyFn()}</div>
		</ClayIconSpriteContext.Provider>
	);
});

const withContainer = (storyFn) => (
	<ClayLayout.ContainerFluid size="md">{storyFn()}</ClayLayout.ContainerFluid>
);

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
				'Example of using geolocation clause condition and configuration variables. Requires the gsearch-geolocation module.',
			enabled: true,
		},
		title: {en_US: "User's Geolocation"},
	},
];

storiesOf('Pages|ConfigurationSetForm', module).add('default', () => (
	<ConfigurationSetForm cancelUrl="" formName="testFm" title="" />
));

storiesOf('Components|PageToolbar', module).add('PageToolbar', () => (
	<PageToolbar
		initialTitle={{}}
		onCancel=""
		onPublish={action('onPublish')}
	/>
));

storiesOf('Components|Sidebar', module).add('Sidebar', () => (
	<Sidebar
		addFragment={action('addFragment')}
		queryFragments={queryFragments}
	/>
));

storiesOf('Components|Builder', module)
	.addDecorator(withContainer)
	.add('Builder', () => (
		<Builder
			deleteFragment={action('buildFragment')}
			selectedFragments={queryFragments}
		/>
	));

storiesOf('Components|Fragment', module)
	.addDecorator(withContainer)
	.add('Fragment', () => (
		<Fragment
			deleteFragment={action('deleteFragment')}
			description={queryFragments[0].description}
			disabled={false}
			icon={queryFragments[0].icon}
			json={queryFragments[0].json}
			title={queryFragments[0].title}
		/>
	));
