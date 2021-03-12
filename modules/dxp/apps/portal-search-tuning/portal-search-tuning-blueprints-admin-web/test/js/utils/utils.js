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

import {
	getDefaultValue,
	getElementOutput,
	isNotEmpty,
	isNotNullOrUndefined,
	renameKeys,
	replaceStr,
} from '../../../src/main/resources/META-INF/resources/js/utils/utils';

describe('utils', () => {
	describe('isNotEmpty', () => {
		it('returns false for empty string', () => {
			expect(isNotEmpty('')).toEqual(false);
		});

		it('returns false for null', () => {
			expect(isNotEmpty(null)).toEqual(false);
		});

		it('returns false for undefined', () => {
			expect(isNotEmpty(undefined)).toEqual(false);
		});

		it('returns true for []', () => {
			expect(isNotEmpty([])).toEqual(true);
		});

		it('returns true for object', () => {
			expect(isNotEmpty({test: [1, 2, 3]})).toEqual(true);
		});
	});

	describe('isNotNullOrUndefined', () => {
		it('returns true for empty string', () => {
			expect(isNotNullOrUndefined('')).toEqual(true);
		});

		it('returns false for null', () => {
			expect(isNotNullOrUndefined(null)).toEqual(false);
		});

		it('returns false for undefined', () => {
			expect(isNotNullOrUndefined(undefined)).toEqual(false);
		});

		it('returns true for []', () => {
			expect(isNotNullOrUndefined([])).toEqual(true);
		});

		it('returns true for object', () => {
			expect(isNotNullOrUndefined({test: [1, 2, 3]})).toEqual(true);
		});
	});

	describe('replaceStr', () => {
		it('replaces the string for locale', () => {
			expect(
				replaceStr(
					'title_${config.language}',
					'${config.language}',
					'en_US'
				)
			).toEqual('title_en_US');
		});
	});

	describe('renameKeys', () => {
		it('replaces the string for locale', () => {
			expect(
				renameKeys({'en-US': 'Hello', 'zh-CN': 'Ni Hao'}, (str) =>
					str.replace('-', '_')
				)
			).toEqual({en_US: 'Hello', zh_CN: 'Ni Hao'});
		});
	});

	describe('getDefaultValue', () => {
		it('gets default value for regular dates', () => {
			expect(
				getDefaultValue({
					defaultValue: '01-01-2021',
					key: 'start_date',
					label: 'Create Date: From',
					type: 'date',
				})
			).toEqual(1609488000); //unix time
		});

		it('gets default value for unix dates', () => {
			expect(
				getDefaultValue({
					defaultValue: 1615509523,
					key: 'start_date',
					label: 'Create Date: From',
					type: 'date',
				})
			).toEqual(1615509523); //same number
		});

		it('gets default value for empty dates', () => {
			expect(
				getDefaultValue({
					key: 'start_date',
					label: 'Create Date: From',
					type: 'date',
				})
			).toEqual('');
		});

		it('gets default value for select', () => {
			expect(
				getDefaultValue({
					defaultValue: false,
					key: 'config.lfr.enabled',
					label: 'Enabled',
					type: 'select',
					typeOptions: {
						options: [
							{
								label: 'True',
								value: true,
							},
							{
								label: 'False',
								value: false,
							},
						],
					},
				})
			).toEqual(false);
		});

		it('gets default value for empty select', () => {
			expect(
				getDefaultValue({
					key: 'config.lfr.enabled',
					label: 'Enabled',
					type: 'select',
					typeOptions: {
						options: [
							{
								label: 'True',
								value: true,
							},
							{
								label: 'False',
								value: false,
							},
						],
					},
				})
			).toEqual(true); //gets first value in options
		});

		it('gets default value for empty select', () => {
			expect(
				getDefaultValue({
					key: 'config.value',
					label: 'Value',
					type: 'select',
					typeOptions: {
						options: [
							{
								label: 'Best Value',
								value: 'best_value',
							},
							{
								label: 'Fuzzy Value',
								value: 'fuzzy_value',
							},
						],
					},
				})
			).toEqual('best_value'); //gets first value in options
		});

		it('gets default value for itemSelector', () => {
			expect(
				getDefaultValue({
					defaultValue: [{label: 'correct', value: 'correct'}],
					helpText: 'Select role',
					key: 'role_id',
					label: 'Role',
					type: 'itemSelector',
					typeOptions: {
						itemType: 'com.liferay.portal.kernel.model.Role',
					},
				})
			).toEqual([{label: 'correct', value: 'correct'}]);
		});

		it('gets default value for incorrect itemSelector', () => {
			expect(
				getDefaultValue({
					defaultValue: [{id: 'incorrect', value: 'incorrect'}],
					helpText: 'Select role',
					key: 'role_id',
					label: 'Role',
					type: 'itemSelector',
					typeOptions: {
						itemType: 'com.liferay.portal.kernel.model.Role',
					},
				})
			).toEqual([]);
		});

		it('gets default value for empty itemSelector', () => {
			expect(
				getDefaultValue({
					helpText: 'Select role',
					key: 'role_id',
					label: 'Role',
					type: 'itemSelector',
					typeOptions: {
						itemType: 'com.liferay.portal.kernel.model.Role',
					},
				})
			).toEqual([]);
		});

		it('gets default value for multiselect', () => {
			expect(
				getDefaultValue({
					defaultValue: [],
					key: 'values',
					label: 'Values',
					type: 'multiselect',
				})
			).toEqual([]);
		});

		it('gets default value for empty multiselect', () => {
			expect(
				getDefaultValue({
					key: 'values',
					label: 'Values',
					type: 'multiselect',
				})
			).toEqual([]);
		});

		it('gets default value for number', () => {
			expect(
				getDefaultValue({
					defaultValue: 30,
					key: 'time_range',
					label: 'Time range',
					type: 'number',
					typeOptions: {
						unit: 'days',
						unitSuffix: 'd',
					},
				})
			).toEqual(30);
		});

		it('gets default value for empty number', () => {
			expect(
				getDefaultValue({
					key: 'time_range',
					label: 'Time range',
					type: 'number',
					typeOptions: {
						unit: 'days',
						unitSuffix: 'd',
					},
				})
			).toEqual('');
		});

		it('gets default value for slider', () => {
			expect(
				getDefaultValue({
					defaultValue: 10,
					key: 'config.title.boost',
					label: 'Title Boost',
					type: 'slider',
				})
			).toEqual(10);
		});

		it('gets default value for empty slider', () => {
			expect(
				getDefaultValue({
					key: 'config.title.boost',
					label: 'Title Boost',
					type: 'slider',
				})
			).toEqual('');
		});

		it('gets default value for field list', () => {
			expect(
				getDefaultValue({
					boost: true,
					defaultValue: [
						{
							boost: 2,
							field: 'localized_title',
							locale: '${context.language_id}',
						},
					],
					key: 'fields',
					label: 'Field',
					type: 'field-list',
					typeOptions: {
						boost: true,
					},
				})
			).toEqual([
				{
					boost: 2,
					field: 'localized_title',
					locale: '${context.language_id}',
				},
			]);
		});

		it('gets default value for incorrect field list', () => {
			expect(
				getDefaultValue({
					defaultValue: [
						{
							boost: 2,
							locale: '${context.language_id}',
							value: 'localized_title',
						},
					],
					key: 'fields',
					label: 'Field',
					type: 'field-list',
					typeOptions: {
						boost: true,
					},
				})
			).toEqual([]); //defaultValue needs locale and field
		});

		it('gets default value for empty field list', () => {
			expect(
				getDefaultValue({
					key: 'fields',
					label: 'Field',
					type: 'field-list',
					typeOptions: {
						boost: true,
					},
				})
			).toEqual([]);
		});

		it('gets default value for field', () => {
			expect(
				getDefaultValue({
					defaultValue: {
						field: '',
						locale: '',
					},
					key: 'field',
					label: 'Field',
					type: 'field',
				})
			).toEqual({
				field: '',
				locale: '',
			});
		});

		it('gets default value for empty field', () => {
			expect(
				getDefaultValue({
					key: 'field',
					label: 'Field',
					type: 'field',
				})
			).toEqual({
				field: '',
				locale: '',
			});
		});

		it('gets default value for json', () => {
			expect(
				getDefaultValue({
					defaultValue: {test: 'abc'},
					key: 'query',
					type: 'json',
				})
			).toEqual({test: 'abc'});
		});

		it('gets default value for empty json', () => {
			expect(
				getDefaultValue({
					key: 'query',
					type: 'json',
				})
			).toEqual({});
		});

		it('gets default value for text', () => {
			expect(
				getDefaultValue({
					defaultValue: 'simple text value',
					helpText: 'Add asset tag value',
					key: 'asset_tag',
					label: 'Asset Tag',
					type: 'text',
				})
			).toEqual('simple text value');
		});

		it('gets default value for empty text', () => {
			expect(
				getDefaultValue({
					key: 'asset_tag',
					label: 'Asset Tag',
					type: 'text',
				})
			).toEqual('');
		});

		it('gets default value for empty type', () => {
			expect(
				getDefaultValue({
					defaultValue: {test: 'abc'},
					key: 'json',
					label: 'Json',
				})
			).toEqual({test: 'abc'});
		});

		it('gets default value for empty text/type', () => {
			expect(
				getDefaultValue({
					key: 'tag',
					label: 'Tag',
				})
			).toEqual('');
		});
	});

	describe('getElementOutput', () => {
		it('gets elementOutput of date', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						start_date: '${config.start_date}',
					},
					uiConfigurationJSON: [
						{
							key: 'start_date',
							label: 'Create Date: From',
							type: 'date',
							typeOptions: {
								format: 'YYYYMMDD',
							},
						},
					],
					uiConfigurationValues: {
						start_date: 1609488000,
					},
				})
			).toEqual({
				start_date: 20210101,
			});
		});

		it('gets elementOutput of select', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						type: '${config.type}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: 'best_fields',
							key: 'type',
							label: 'Match Type',
							type: 'select',
							typeOptions: {
								options: [
									{
										label: 'Best Fields',
										value: 'best_fields',
									},
									{
										label: 'Most Fields',
										value: 'most_fields',
									},
									{
										label: 'Cross Fields',
										value: 'cross_fields',
									},
								],
							},
						},
					],
					uiConfigurationValues: {
						type: 'best_fields',
					},
				})
			).toEqual({
				type: 'best_fields',
			});
		});

		it('gets elementOutput of itemSelector', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						role: '${config.role_id}',
					},
					uiConfigurationJSON: [
						{
							key: 'role_id',
							label: 'Role',
							type: 'itemSelector',
							typeOptions: {
								itemType:
									'com.liferay.portal.kernel.model.Role',
							},
						},
					],
					uiConfigurationValues: {
						role_id: [{label: 'Administrator', value: '20107'}],
					},
				})
			).toEqual({
				role: ['20107'],
			});
		});

		it('gets elementOutput of multiselect', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						keywords: '${config.keywords}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: [],
							key: 'keywords',
							label: 'Keywords',
							type: 'multiselect',
						},
					],
					uiConfigurationValues: {
						keywords: [{label: 'test', value: 'test'}],
					},
				})
			).toEqual({
				keywords: ['test'],
			});
		});

		it('gets elementOutput of number', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						asset_category_id: '${config.asset_category_id}',
					},
					uiConfigurationJSON: [
						{
							helpText: 'Add asset category ID',
							key: 'asset_category_id',
							label: 'Asset Category',
							type: 'number',
						},
					],
					uiConfigurationValues: {
						asset_category_id: 1032490,
					},
				})
			).toEqual({
				asset_category_id: 1032490,
			});
		});

		it('gets elementOutput of number with suffix', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						time_range: '${config.time_range}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: 30,
							key: 'time_range',
							label: 'Time range',
							type: 'number',
							typeOptions: {
								unit: 'days',
								unitSuffix: 'd',
							},
						},
					],
					uiConfigurationValues: {
						time_range: 30,
					},
				})
			).toEqual({
				time_range: '30d',
			});
		});

		it('gets elementOutput of slider', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						boost: '${config.boost}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: 10,
							key: 'boost',
							label: 'Boost',
							type: 'slider',
						},
					],
					uiConfigurationValues: {
						boost: 20,
					},
				})
			).toEqual({
				boost: 20,
			});
		});

		it('gets elementOutput of field', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						field: '${config.field}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: {
								field: '',
								locale: '',
							},
							key: 'field',
							label: 'Field',
							type: 'field',
						},
					],
					uiConfigurationValues: {
						field: {
							boost: 1,
							field: 'localized_title',
							locale: '${context.language_id}',
						},
					},
				})
			).toEqual({
				field: 'localized_title${context.language_id}^1',
			});
		});

		it('gets elementOutput of field-list', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						fields: '${config.fields}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: [
								{
									boost: 2,
									field: 'localized_title',
									locale: '${context.language_id}',
								},
								{
									boost: 1,
									field: 'content',
									locale: '${context.language_id}',
								},
							],
							key: 'fields',
							label: 'Field',
							type: 'field-list',
							typeOptions: {
								boost: true,
							},
						},
					],
					uiConfigurationValues: {
						fields: [
							{
								boost: 2,
								field: 'localized_title',
								locale: '${context.language_id}',
							},
							{
								boost: 1,
								field: 'content',
								locale: '${context.language_id}',
							},
						],
					},
				})
			).toEqual({
				fields: [
					'localized_title${context.language_id}^2',
					'content${context.language_id}^1',
				],
			});
		});

		it('gets elementOutput of json', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						json: '${config.json}',
					},
					uiConfigurationJSON: [
						{
							defaultValue: {},
							key: 'json',
							type: 'json',
						},
					],
					uiConfigurationValues: {
						json: {
							category: 'custom',
						},
					},
				})
			).toEqual({
				json: {category: 'custom'},
			});
		});

		it('gets elementOutput of text', () => {
			expect(
				getElementOutput({
					elementTemplateJSON: {
						geopoint: '${config.geopoint}',
					},
					uiConfigurationJSON: [
						{
							defaultValue:
								'expando__keyword__custom_fields__location_geolocation',
							helpText: 'A geopoint field',
							key: 'geopoint',
							label: 'Geopoint',
							type: 'text',
						},
					],
					uiConfigurationValues: {
						geopoint:
							'expando__keyword__custom_fields__location_geolocation',
					},
				})
			).toEqual({
				geopoint:
					'expando__keyword__custom_fields__location_geolocation',
			});
		});
	});
});
