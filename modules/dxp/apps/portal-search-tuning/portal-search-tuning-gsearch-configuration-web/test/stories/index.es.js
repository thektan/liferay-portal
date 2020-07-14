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
const {boolean, withKnobs} = StorybookAddonKnobs;

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

storiesOf('Pages|ConfigurationSetForm', module).add('default', () => (
	<ConfigurationSetForm cancelUrl="" formName="testFm" title="" />
));

storiesOf('Components|PageToolbar', module).add('PageToolbar', () => (
	<PageToolbar
		onCancel={action('onCancel')}
		onPublish={action('onPublish')}
		submitDisabled={boolean('Disabled', false)}
		titleTranslations={{}}
	/>
));

storiesOf('Components|Sidebar', module).add('Sidebar', () => <Sidebar />);

storiesOf('Components|Builder', module)
	.addDecorator(withContainer)
	.add('Builder', () => <Builder />);

storiesOf('Components|Fragment', module)
	.addDecorator(withContainer)
	.add('Fragment', () => (
		<Fragment
			deleteURL="/"
			description="Sample description"
			icon="time"
			title="Sample Title"
		/>
	));
