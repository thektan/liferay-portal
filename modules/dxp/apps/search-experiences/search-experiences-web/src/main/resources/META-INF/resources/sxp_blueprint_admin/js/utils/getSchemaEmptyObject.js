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

import {fetch} from 'frontend-js-web';

function getComponentSchemaProperties(openapiResponse, componentName) {
	return openapiResponse.components.schemas[componentName]?.properties;
}

function getPropertyDefaultValuesObject(openapiResponse, properties) {
	const propertyDefaultValues = {};

	Object.keys(properties).map((propertyKey) => {
		const property = properties[propertyKey];

		if (propertyKey === 'x-class-name') {
			return;
		}

		switch (property.type) {
			case 'array':
				propertyDefaultValues[propertyKey] = [];
				break;
			case 'boolean':
				propertyDefaultValues[propertyKey] = true;
				break;
			case 'integer':
				propertyDefaultValues[propertyKey] = 0;
				break;
			case 'number':
				propertyDefaultValues[propertyKey] = 0;
				break;
			case 'object':
				propertyDefaultValues[propertyKey] = {};
				break;
			case 'string':
				propertyDefaultValues[propertyKey] = '';
				break;
			default:
		}

		if (property.$ref) {
			const componentName = property.$ref.replace(
				'#/components/schemas/',
				''
			);

			const properties = getComponentSchemaProperties(
				openapiResponse,
				componentName
			);

			propertyDefaultValues[propertyKey] = getPropertyDefaultValuesObject(
				openapiResponse,
				properties
			);
		}

		// Skip property if type is not recognized.

	});

	return propertyDefaultValues;
}

/**
 * Uses the openapi.json endpoint to get an object template for a schema
 * definition. This is currently used for the default value in the editor when
 * creating a new SXPElement.
 *
 * For example this would return the following object:
 * {
 * 	category: '',
 * 	configuration: {},
 * 	icon: '',
 * 	uiConfiguration: {}
 * }
 */
export async function getSchemaEmptyObject(schemaName) {
	const openapiResponse = await fetch(
		`/o/search-experiences-rest/v1.0/openapi.json`,
		{method: 'GET'}
	).then((response) => {
		return response.json();
	});

	const properties = getComponentSchemaProperties(
		openapiResponse,
		schemaName
	);

	return properties
		? getPropertyDefaultValuesObject(openapiResponse, properties)
		: {};
}
