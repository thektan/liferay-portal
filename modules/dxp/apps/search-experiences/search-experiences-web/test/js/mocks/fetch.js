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

import {INDEX_FIELDS, QUERY_SXP_ELEMENTS, mockClassNames} from './data';

function trimURL(url) {
	let trimmedURL = url.href || url; // Handling if url is a URL object or a string

	// Remove baseURL

	if (trimmedURL.startsWith('http://localhost:8080')) {
		trimmedURL = trimmedURL.replace('http://localhost:8080', '');
	}

	// Remove query string parameters

	return trimmedURL.split('?')[0];
}

async function mockFetch(url) {
	switch (trimURL(url)) {
		case '/o/search-experiences-rest/v1.0/field-mapping-infos': {
			return {
				json: async () => ({
					items: INDEX_FIELDS,
					page: 1,
					totalCount: INDEX_FIELDS.length,
				}),
				ok: true,
				status: 200,
			};
		}
		case '/o/search-experiences-rest/v1.0/keyword-query-contributors': {
			return {
				json: async () => ({
					items: mockClassNames('KeywordQueryContributor'),
					page: 1,
					totalCount: 10,
				}),
				ok: true,
				status: 200,
			};
		}
		case '/o/search-experiences-rest/v1.0/model-prefilter-contributors': {
			return {
				json: async () => ({
					items: mockClassNames('ModelPrefilterContributor'),
					page: 1,
					totalCount: 10,
				}),
				ok: true,
				status: 200,
			};
		}
		case '/o/search-experiences-rest/v1.0/query-prefilter-contributors': {
			return {
				json: async () => ({
					items: mockClassNames('QueryPrefilterContributor'),
					page: 1,
					totalCount: 10,
				}),
				ok: true,
				status: 200,
			};
		}
		case '/o/search-experiences-rest/v1.0/searchable-asset-names/en_US': {
			return {
				json: async () => ({
					items: mockClassNames('SearchableAssetType'),
					page: 1,
					totalCount: 10,
				}),
				ok: true,
				status: 200,
			};
		}
		case '/o/search-experiences-rest/v1.0/sxp-elements': {
			return {
				json: async () => ({
					items: QUERY_SXP_ELEMENTS,
					page: 1,
					totalCount: QUERY_SXP_ELEMENTS.length,
				}),
				ok: true,
				status: 200,
			};
		}
		case '/o/search-experiences-rest/v1.0/openapi.json': {
			return {
				json: async () => ({
					components: {
						schemas: {
							PageKeywordQueryContributor: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/KeywordQueryContributor',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							ModelPrefilterContributor: {
								properties: {
									'className': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.ModelPrefilterContributor',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'ModelPrefilterContributor',
								},
							},
							PageModelPrefilterContributor: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/ModelPrefilterContributor',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							PageQueryPrefilterContributor: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/QueryPrefilterContributor',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							QueryPrefilterContributor: {
								properties: {
									'className': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.QueryPrefilterContributor',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'QueryPrefilterContributor',
								},
							},
							AdvancedConfiguration: {
								properties: {
									'excludes': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'fetchSource': {
										type: 'boolean',
									},
									'includes': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.AdvancedConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'AdvancedConfiguration',
								},
							},
							AggregationConfiguration: {
								properties: {
									'aggs': {
										type: 'object',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.AggregationConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'AggregationConfiguration',
								},
							},
							Clause: {
								properties: {
									'additive': {
										type: 'boolean',
									},
									'boost': {
										format: 'float',
										type: 'number',
									},
									'context': {
										type: 'string',
									},
									'disabled': {
										type: 'boolean',
									},
									'field': {
										type: 'string',
									},
									'name': {
										type: 'string',
									},
									'occur': {
										type: 'string',
									},
									'parent': {
										type: 'string',
									},
									'query': {
										type: 'object',
									},
									'type': {
										type: 'string',
									},
									'value': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Clause',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Clause',
								},
							},
							Condition: {
								properties: {
									'allConditions': {
										items: {
											$ref:
												'#/components/schemas/Condition',
										},
										type: 'array',
									},
									'anyConditions': {
										items: {
											$ref:
												'#/components/schemas/Condition',
										},
										type: 'array',
									},
									'contains': {
										$ref: '#/components/schemas/Contains',
									},
									'equals': {
										$ref: '#/components/schemas/Equals',
									},
									'exists': {
										$ref: '#/components/schemas/Exists',
									},
									'in': {
										$ref: '#/components/schemas/In',
									},
									'not': {
										$ref: '#/components/schemas/Condition',
									},
									'range': {
										$ref: '#/components/schemas/Range',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Condition',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Condition',
								},
							},
							Configuration: {
								properties: {
									'advancedConfiguration': {
										$ref:
											'#/components/schemas/AdvancedConfiguration',
									},
									'aggregationConfiguration': {
										$ref:
											'#/components/schemas/AggregationConfiguration',
									},
									'generalConfiguration': {
										$ref:
											'#/components/schemas/GeneralConfiguration',
									},
									'highlightConfiguration': {
										$ref:
											'#/components/schemas/HighlightConfiguration',
									},
									'parameterConfiguration': {
										$ref:
											'#/components/schemas/ParameterConfiguration',
									},
									'queryConfiguration': {
										$ref:
											'#/components/schemas/QueryConfiguration',
									},
									'searchContextAttributes': {
										additionalProperties: {
											type: 'object',
										},
										type: 'object',
									},
									'sortConfiguration': {
										$ref:
											'#/components/schemas/SortConfiguration',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Configuration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Configuration',
								},
							},
							Contains: {
								properties: {
									'parameterName': {
										type: 'string',
									},
									'value': {
										type: 'object',
									},
									'values': {
										items: {
											type: 'object',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Contains',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Contains',
								},
							},
							ElementDefinition: {
								properties: {
									'category': {
										type: 'string',
									},
									'configuration': {
										$ref:
											'#/components/schemas/Configuration',
									},
									'icon': {
										type: 'string',
									},
									'uiConfiguration': {
										$ref:
											'#/components/schemas/UiConfiguration',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.ElementDefinition',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'ElementDefinition',
								},
							},
							ElementInstance: {
								properties: {
									'configurationEntry': {
										$ref:
											'#/components/schemas/Configuration',
									},
									'sxpElement': {
										$ref: '#/components/schemas/SXPElement',
									},
									'sxpElementId': {
										format: 'int64',
										type: 'integer',
									},
									'type': {
										format: 'int32',
										type: 'integer',
									},
									'uiConfigurationValues': {
										additionalProperties: {
											type: 'object',
										},
										type: 'object',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.ElementInstance',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'ElementInstance',
								},
							},
							Equals: {
								properties: {
									'format': {
										type: 'string',
									},
									'parameterName': {
										type: 'string',
									},
									'value': {
										type: 'object',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Equals',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Equals',
								},
							},
							Exists: {
								properties: {
									'parameterName': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Exists',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Exists',
								},
							},
							Field: {
								properties: {
									'step': {
										type: 'object',
									},
									'fieldMappings': {
										items: {
											$ref:
												'#/components/schemas/FieldMapping',
										},
										type: 'array',
									},
									'helpText': {
										type: 'string',
									},
									'label': {
										type: 'string',
									},
									'name': {
										type: 'string',
									},
									'type': {
										type: 'string',
									},
									'typeOptions': {
										$ref:
											'#/components/schemas/TypeOptions',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Field',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Field',
								},
							},
							FieldMapping: {
								properties: {
									'boost': {
										format: 'float',
										type: 'number',
									},
									'field': {
										type: 'string',
									},
									'locale': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.FieldMapping',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'FieldMapping',
								},
							},
							FieldSet: {
								properties: {
									'fields': {
										items: {
											$ref: '#/components/schemas/Field',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.FieldSet',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'FieldSet',
								},
							},
							GeneralConfiguration: {
								properties: {
									'clauseContributorsExcludes': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'clauseContributorsIncludes': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'emptySearchEnabled': {
										type: 'boolean',
									},
									'explain': {
										type: 'boolean',
									},
									'includeResponseString': {
										type: 'boolean',
									},
									'searchableAssetTypes': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.GeneralConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'GeneralConfiguration',
								},
							},
							HighlightConfiguration: {
								properties: {
									'fields': {
										additionalProperties: {
											$ref:
												'#/components/schemas/HighlightField',
										},
										type: 'object',
									},
									'fragment_size': {
										format: 'int32',
										type: 'integer',
									},
									'number_of_fragments': {
										format: 'int32',
										type: 'integer',
									},
									'post_tags': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'pre_tags': {
										items: {
											type: 'string',
										},
										type: 'array',
									},
									'require_field_match': {
										type: 'boolean',
									},
									'type': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.HighlightConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'HighlightConfiguration',
								},
							},
							HighlightField: {
								properties: {
									'fragment_offset': {
										format: 'int32',
										type: 'integer',
									},
									'fragment_size': {
										format: 'int32',
										type: 'integer',
									},
									'number_of_fragments': {
										format: 'int32',
										type: 'integer',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.HighlightField',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'HighlightField',
								},
							},
							In: {
								properties: {
									'parameterName': {
										type: 'string',
									},
									'values': {
										items: {
											type: 'object',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.In',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'In',
								},
							},
							Option: {
								properties: {
									'label': {
										type: 'string',
									},
									'value': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Option',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Option',
								},
							},
							Parameter: {
								properties: {
									'min': {
										type: 'object',
									},
									'format': {
										type: 'string',
									},
									'type': {
										enum: [
											'Boolean',
											'Date',
											'Double',
											'Float',
											'Integer',
											'IntegerArray',
											'Long',
											'LongArray',
											'String',
											'StringArray',
											'TimeRange',
										],
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Parameter',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Parameter',
								},
							},
							ParameterConfiguration: {
								properties: {
									'parameters': {
										additionalProperties: {
											$ref:
												'#/components/schemas/Parameter',
										},
										type: 'object',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.ParameterConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'ParameterConfiguration',
								},
							},
							QueryConfiguration: {
								properties: {
									'applyIndexerClauses': {
										type: 'boolean',
									},
									'queryEntries': {
										items: {
											$ref:
												'#/components/schemas/QueryEntry',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.QueryConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'QueryConfiguration',
								},
							},
							QueryEntry: {
								properties: {
									'clauses': {
										items: {
											$ref: '#/components/schemas/Clause',
										},
										type: 'array',
									},
									'condition': {
										$ref: '#/components/schemas/Condition',
									},
									'enabled': {
										type: 'boolean',
									},
									'postFilterClauses': {
										items: {
											$ref: '#/components/schemas/Clause',
										},
										type: 'array',
									},
									'rescores': {
										items: {
											$ref:
												'#/components/schemas/Rescore',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.QueryEntry',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'QueryEntry',
								},
							},
							Range: {
								properties: {
									'format': {
										type: 'string',
									},
									'value': {
										type: 'object',
									},
									'parameterName': {
										type: 'string',
									},
									'values': {
										items: {
											type: 'object',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Range',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Range',
								},
							},
							Rescore: {
								properties: {
									'query': {
										type: 'object',
									},
									'queryWeight': {
										format: 'float',
										type: 'number',
									},
									'rescoreQueryWeight': {
										format: 'float',
										type: 'number',
									},
									'scoreMode': {
										type: 'string',
									},
									'windowSize': {
										format: 'int32',
										type: 'integer',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.Rescore',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'Rescore',
								},
							},
							SXPBlueprint: {
								properties: {
									'configuration': {
										$ref:
											'#/components/schemas/Configuration',
									},
									'createDate': {
										format: 'date-time',
										type: 'string',
									},
									'description': {
										type: 'string',
									},
									'description_i18n': {
										additionalProperties: {
											type: 'string',
										},
										type: 'object',
									},
									'elementInstances': {
										items: {
											$ref:
												'#/components/schemas/ElementInstance',
										},
										type: 'array',
									},
									'id': {
										format: 'int64',
										type: 'integer',
									},
									'modifiedDate': {
										format: 'date-time',
										type: 'string',
									},
									'title': {
										type: 'string',
									},
									'title_i18n': {
										additionalProperties: {
											type: 'string',
										},
										type: 'object',
									},
									'userName': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SXPBlueprint',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SXPBlueprint',
								},
							},
							SXPElement: {
								properties: {
									'createDate': {
										format: 'date-time',
										type: 'string',
									},
									'description': {
										type: 'string',
									},
									'description_i18n': {
										additionalProperties: {
											type: 'string',
										},
										type: 'object',
									},
									'elementDefinition': {
										$ref:
											'#/components/schemas/ElementDefinition',
									},
									'hidden': {
										type: 'boolean',
									},
									'id': {
										format: 'int64',
										type: 'integer',
									},
									'modifiedDate': {
										format: 'date-time',
										type: 'string',
									},
									'readOnly': {
										type: 'boolean',
									},
									'title': {
										type: 'string',
									},
									'title_i18n': {
										additionalProperties: {
											type: 'string',
										},
										type: 'object',
									},
									'type': {
										format: 'int32',
										type: 'integer',
									},
									'userName': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SXPElement',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SXPElement',
								},
							},
							SortConfiguration: {
								properties: {
									'sorts': {
										type: 'object',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SortConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SortConfiguration',
								},
							},
							TypeOptions: {
								properties: {
									'boost': {
										type: 'boolean',
									},
									'format': {
										type: 'string',
									},
									'step': {
										type: 'object',
									},
									'nullable': {
										type: 'boolean',
									},
									'options': {
										items: {
											$ref: '#/components/schemas/Option',
										},
										type: 'array',
									},
									'required': {
										type: 'boolean',
									},
									'unit': {
										type: 'string',
									},
									'unitSuffix': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.TypeOptions',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'TypeOptions',
								},
							},
							UiConfiguration: {
								properties: {
									'fieldSets': {
										items: {
											$ref:
												'#/components/schemas/FieldSet',
										},
										type: 'array',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.UiConfiguration',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'UiConfiguration',
								},
							},
							PageSXPBlueprint: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/SXPBlueprint',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							PageSXPElement: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/SXPElement',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							PageSXPParameterContributorDefinition: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/SXPParameterContributorDefinition',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							SXPParameterContributorDefinition: {
								properties: {
									'className': {
										type: 'string',
									},
									'description': {
										type: 'string',
									},
									'templateVariable': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SXPParameterContributorDefinition',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SXPParameterContributorDefinition',
								},
							},
							SearchResponse: {
								properties: {
									'page': {
										format: 'int32',
										type: 'integer',
									},
									'pageSize': {
										format: 'int32',
										type: 'integer',
									},
									'requestString': {
										type: 'string',
									},
									'responseString': {
										type: 'string',
									},
									'totalHits': {
										format: 'int32',
										type: 'integer',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SearchResponse',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SearchResponse',
								},
							},
							PageSearchableAssetNameDisplay: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/SearchableAssetNameDisplay',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							SearchableAssetNameDisplay: {
								properties: {
									'className': {
										type: 'string',
									},
									'displayName': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SearchableAssetNameDisplay',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SearchableAssetNameDisplay',
								},
							},
							PageSearchableAssetName: {
								properties: {
									totalCount: {
										format: 'int64',
										type: 'integer',
									},
									lastPage: {
										format: 'int64',
										type: 'integer',
									},
									items: {
										items: {
											$ref:
												'#/components/schemas/SearchableAssetName',
										},
										type: 'array',
									},
									page: {
										format: 'int64',
										type: 'integer',
									},
									facets: {
										items: {
											$ref: '#/components/schemas/Facet',
										},
										type: 'array',
									},
									actions: {
										additionalProperties: {
											additionalProperties: {
												type: 'string',
											},
											type: 'object',
										},
										type: 'object',
									},
									pageSize: {
										format: 'int64',
										type: 'integer',
									},
								},
								type: 'object',
							},
							SearchableAssetName: {
								properties: {
									'className': {
										type: 'string',
									},
									'x-class-name': {
										default:
											'com.liferay.search.experiences.rest.dto.v1_0.SearchableAssetName',
										readOnly: true,
										type: 'string',
									},
								},
								type: 'object',
								xml: {
									name: 'SearchableAssetName',
								},
							},
						},
					},
					info: {
						description:
							"A Java client JAR is available for use with the group ID 'com.liferay', artifact ID 'com.liferay.search.experiences.rest.client', and version '1.0.0'.",
						license: {
							name: 'Apache 2.0',
							url:
								'http://www.apache.org/licenses/LICENSE-2.0.html',
						},
						version: 'v1.0',
					},
					openapi: '3.0.1',
					paths: {
						'/v1.0/field-mapping-infos': {
							get: {
								operationId: 'getFieldMappingInfosPage',
								parameters: [
									{
										in: 'query',
										name: 'query',
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageFieldMappingInfo',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageFieldMappingInfo',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['FieldMappingInfo'],
							},
						},
						'/v1.0/keyword-query-contributors': {
							get: {
								operationId: 'getKeywordQueryContributorsPage',
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageKeywordQueryContributor',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageKeywordQueryContributor',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['KeywordQueryContributor'],
							},
						},
						'/v1.0/model-prefilter-contributors': {
							get: {
								operationId:
									'getModelPrefilterContributorsPage',
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageModelPrefilterContributor',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageModelPrefilterContributor',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['ModelPrefilterContributor'],
							},
						},
						'/v1.0/openapi.{type}': {
							get: {
								operationId: 'getOpenAPI',
								parameters: [
									{
										in: 'path',
										name: 'type',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {},
											'application/yaml': {},
										},
										description: 'default response',
									},
								},
							},
						},
						'/v1.0/query-prefilter-contributors': {
							get: {
								operationId:
									'getQueryPrefilterContributorsPage',
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageQueryPrefilterContributor',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageQueryPrefilterContributor',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['QueryPrefilterContributor'],
							},
						},
						'/v1.0/sxp-blueprints/{sxpBlueprintId}': {
							delete: {
								operationId: 'deleteSXPBlueprint',
								parameters: [
									{
										in: 'path',
										name: 'sxpBlueprintId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {},
											'application/xml': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
							get: {
								operationId: 'getSXPBlueprint',
								parameters: [
									{
										in: 'path',
										name: 'sxpBlueprintId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
							patch: {
								operationId: 'patchSXPBlueprint',
								parameters: [
									{
										in: 'path',
										name: 'sxpBlueprintId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
										'application/xml': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-blueprints': {
							get: {
								operationId: 'getSXPBlueprintsPage',
								parameters: [
									{
										in: 'query',
										name: 'search',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'filter',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'page',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'pageSize',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'sort',
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageSXPBlueprint',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageSXPBlueprint',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
							post: {
								operationId: 'postSXPBlueprint',
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
										'application/xml': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-blueprints/validate': {
							post: {
								operationId: 'postSXPBlueprintValidate',
								requestBody: {
									content: {
										'application/json': {
											schema: {
												type: 'string',
											},
										},
										'application/xml': {
											schema: {
												type: 'string',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-blueprints/{sxpBlueprintId}/copy': {
							post: {
								operationId: 'postSXPBlueprintCopy',
								parameters: [
									{
										in: 'path',
										name: 'sxpBlueprintId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPBlueprint',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-blueprints/{sxpBlueprintId}/export': {
							get: {
								operationId: 'getSXPBlueprintExport',
								parameters: [
									{
										in: 'path',
										name: 'sxpBlueprintId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {},
											'application/xml': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-blueprints/batch': {
							post: {
								operationId: 'postSXPBlueprintBatch',
								parameters: [
									{
										in: 'query',
										name: 'callbackURL',
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-blueprints/{sxpBlueprintId}/batch': {
							delete: {
								operationId: 'deleteSXPBlueprintBatch',
								parameters: [
									{
										in: 'path',
										name: 'sxpBlueprintId',
										required: true,
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'callbackURL',
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												type: 'object',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPBlueprint'],
							},
						},
						'/v1.0/sxp-elements/{sxpElementId}': {
							delete: {
								operationId: 'deleteSXPElement',
								parameters: [
									{
										in: 'path',
										name: 'sxpElementId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {},
											'application/xml': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
							get: {
								operationId: 'getSXPElement',
								parameters: [
									{
										in: 'path',
										name: 'sxpElementId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
							patch: {
								operationId: 'patchSXPElement',
								parameters: [
									{
										in: 'path',
										name: 'sxpElementId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPElement',
											},
										},
										'application/xml': {
											schema: {
												$ref:
													'#/components/schemas/SXPElement',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-elements': {
							get: {
								operationId: 'getSXPElementsPage',
								parameters: [
									{
										in: 'query',
										name: 'search',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'filter',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'page',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'pageSize',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'sort',
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageSXPElement',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageSXPElement',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
							post: {
								operationId: 'postSXPElement',
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPElement',
											},
										},
										'application/xml': {
											schema: {
												$ref:
													'#/components/schemas/SXPElement',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-elements/validate': {
							post: {
								operationId: 'postSXPElementValidate',
								requestBody: {
									content: {
										'application/json': {
											schema: {
												type: 'string',
											},
										},
										'application/xml': {
											schema: {
												type: 'string',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-elements/{sxpElementId}/copy': {
							post: {
								operationId: 'postSXPElementCopy',
								parameters: [
									{
										in: 'path',
										name: 'sxpElementId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SXPElement',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-elements/{sxpElementId}/export': {
							get: {
								operationId: 'getSXPElementExport',
								parameters: [
									{
										in: 'path',
										name: 'sxpElementId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {},
											'application/xml': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-elements/batch': {
							post: {
								operationId: 'postSXPElementBatch',
								parameters: [
									{
										in: 'query',
										name: 'callbackURL',
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPElement',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-elements/{sxpElementId}/batch': {
							delete: {
								operationId: 'deleteSXPElementBatch',
								parameters: [
									{
										in: 'path',
										name: 'sxpElementId',
										required: true,
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'callbackURL',
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												type: 'object',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {},
										},
										description: 'default response',
									},
								},
								tags: ['SXPElement'],
							},
						},
						'/v1.0/sxp-parameter-contributor-definitions': {
							get: {
								operationId:
									'getSXPParameterContributorDefinitionsPage',
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageSXPParameterContributorDefinition',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageSXPParameterContributorDefinition',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SXPParameterContributorDefinition'],
							},
						},
						'/v1.0/search': {
							post: {
								operationId: 'postSearch',
								parameters: [
									{
										in: 'query',
										name: 'query',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'page',
										schema: {
											type: 'string',
										},
									},
									{
										in: 'query',
										name: 'pageSize',
										schema: {
											type: 'string',
										},
									},
								],
								requestBody: {
									content: {
										'application/json': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
										'application/xml': {
											schema: {
												$ref:
													'#/components/schemas/SXPBlueprint',
											},
										},
									},
								},
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/SearchResponse',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/SearchResponse',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SearchResponse'],
							},
						},
						'/v1.0/searchable-asset-names/{languageId}': {
							get: {
								operationId:
									'getSearchableAssetNameLanguagePage',
								parameters: [
									{
										in: 'path',
										name: 'languageId',
										required: true,
										schema: {
											type: 'string',
										},
									},
								],
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageSearchableAssetNameDisplay',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageSearchableAssetNameDisplay',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SearchableAssetNameDisplay'],
							},
						},
						'/v1.0/searchable-asset-names': {
							get: {
								operationId: 'getSearchableAssetNamesPage',
								responses: {
									default: {
										content: {
											'application/json': {
												schema: {
													$ref:
														'#/components/schemas/PageSearchableAssetName',
												},
											},
											'application/xml': {
												schema: {
													$ref:
														'#/components/schemas/PageSearchableAssetName',
												},
											},
										},
										description: 'default response',
									},
								},
								tags: ['SearchableAssetName'],
							},
						},
					},
					servers: [
						{
							url:
								'http://localhost:8080/o/search-experiences-rest/',
						},
					],
				}),
				ok: true,
				status: 200,
			};
		}
		default: {
			console.warn(`Unhandled request: ${url}`);

			return {
				json: async () => ({
					items: [],
					page: 1,
					totalCount: 0,
				}),
				ok: true,
				status: 200,
			};
		}
	}
}

beforeAll(() => jest.spyOn(window, 'fetch'));

beforeEach(() => window.fetch.mockImplementation(mockFetch));
