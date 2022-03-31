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

require('utils/cycle');
const RefParser = require('@apidevtools/json-schema-ref-parser');
const fs = require('fs');
const path = require('path');

const ORIGINAL_SCHEMA_DIR = path.resolve(
	'../search-experiences-service/src/main/resources/com/liferay/search/experiences/internal/validator/dependencies'
);

/**
 * Stringify a JSON object with circular dependencies.
 * https://stackoverflow.com/a/11616993/5092054
 */
JSON.safeStringify = (object, indent = 4) => {
	let cache = [];

	const returnValue = JSON.stringify(
		object,
		(key, value) =>
			typeof value === 'object' && value !== null
				? cache.includes(value)
					? undefined // Duplicate reference found, discard key
					: cache.push(value) && value // Store value in our collection
				: value,
		indent
	);

	cache = null;

	return returnValue;
};

const getCircularReplacer = () => {
	const seen = new WeakSet();

	return (key, value) => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}

		return value;
	};
};

// @TODO Loop through all schema files
//
// fs.readdir(ORIGINAL_SCHEMA_DIR, (error, files) => {
// 	if (error) {
// 		throw error;
// 	}

// 	files.forEach((file) => {
// 		console.log(file);
// 	});
// });

RefParser.dereference(
	'../search-experiences-service/src/main/resources/com/liferay/search/experiences/internal/validator/dependencies/sxpelement.schema.json',
	(error, schema) => {
		if (error) {
			console.error(error);
		} else {
			// `schema` is just a normal JavaScript object that contains your entire JSON Schema,
			// including referenced files, combined into a single object

			fs.writeFileSync(
				'./src/main/resources/META-INF/resources/sxp_blueprint_admin/js/schema/sxpqueryelement.schema.json',
				JSON.stringify(
					JSON.decycle(schema.properties.query_element),
					null,
					4
				)
			);
		}
	}
);
