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

import {getSchemaEmptyObject} from '../../../src/main/resources/META-INF/resources/sxp_blueprint_admin/js/utils/getSchemaEmptyObject';

describe('utils', () => {
	describe('getSchemaEmptyObject', () => {
		it('gets the ElementDefinition empty object', () => {
			expect(
				getSchemaEmptyObject('ElementDefinition')
			).resolves.toStrictEqual({
				category: '',
				configuration: {
					advancedConfiguration: {
						excludes: [],
						fetchSource: true,
						includes: [],
					},
					aggregationConfiguration: {aggs: {}},
					generalConfiguration: {
						clauseContributorsExcludes: [],
						clauseContributorsIncludes: [],
						emptySearchEnabled: true,
						explain: true,
						includeResponseString: true,
						searchableAssetTypes: [],
					},
					highlightConfiguration: {
						fields: {},
						fragment_size: 0,
						number_of_fragments: 0,
						post_tags: [],
						pre_tags: [],
						require_field_match: true,
						type: '',
					},
					parameterConfiguration: {parameters: {}},
					queryConfiguration: {
						applyIndexerClauses: true,
						queryEntries: [],
					},
					searchContextAttributes: {},
					sortConfiguration: {sorts: {}},
				},
				icon: '',
				uiConfiguration: {fieldSets: []},
			});
		});
	});
});
