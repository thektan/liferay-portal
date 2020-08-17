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
	StorybookAddonKnobs,
	StorybookReact,
} from 'liferay-npm-scripts/src/storybook';
import React from 'react';

import ConfigurationSearchApp from '../../src/main/resources/META-INF/resources/js/ConfigurationSearchApp';

import '../../src/main/resources/META-INF/resources/css/main.scss';

const {addDecorator, storiesOf} = StorybookReact;
const {withKnobs} = StorybookAddonKnobs;

addDecorator(withKnobs);

addDecorator((storyFn) => {
	const context = {
		namespace:
			'_com_liferay_portal_search_synonyms_web_portlet_SynonymsPortlet_',
		spritemap: STORYBOOK_CONSTANTS.SPRITEMAP_PATH,
	};

	return (
		<ClayIconSpriteContext.Provider value={context.spritemap}>
			{storyFn()}
		</ClayIconSpriteContext.Provider>
	);
});

const FETCH_URL =
	'https://run.mocky.io/v3/56448a10-1284-46d9-8fbb-99b00e011fee';

//https://designer.mocky.io/manage/delete/56448a10-1284-46d9-8fbb-99b00e011fee/za8266zyTs8qVqtjhJubBKY4iwgiiUgxX2WR

const EMPTY_URL =
	'https://run.mocky.io/v3/f1a9653a-fcac-4722-8fee-64df94df5bf9';

//https://designer.mocky.io/manage/delete/f1a9653a-fcac-4722-8fee-64df94df5bf9/wkN7nAjQk7lkODBz20PYT2kP4AzzygA3j3IE

const BAD_REQUEST_URL =
	'https://run.mocky.io/v3/8c8ab5a2-c99f-4694-b7dc-12b445163a19';

//https://designer.mocky.io/manage/delete/8c8ab5a2-c99f-4694-b7dc-12b445163a19/CKxgru5fFLRPMMp9DDygnbtItINuNOXzZPwD

const ERROR_URL =
	'https://run.mocky.io/v3/4e507ddb-afa4-4845-9ad6-a10a6ddab801';

//https://designer.mocky.io/manage/delete/4e507ddb-afa4-4845-9ad6-a10a6ddab801/QV8czujaGUho78WzE95yDZ0bHMIi46u14bMl

const withSheet = (storyFn) => (
	<div className="sheet sheet-lg" style={{paddingTop: '24px'}}>
		{storyFn()}
	</div>
);

storiesOf('Pages|ConfigurationSearchApp', module)
	.addDecorator(withSheet)
	.add('default', () => <ConfigurationSearchApp suggestionsURL={FETCH_URL} />)
	.add('empty', () => <ConfigurationSearchApp suggestionsURL={EMPTY_URL} />)
	.add('bad request', () => (
		<ConfigurationSearchApp suggestionsURL={BAD_REQUEST_URL} />
	))
	.add('error', () => <ConfigurationSearchApp suggestionsURL={ERROR_URL} />);
