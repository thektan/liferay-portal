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
import React, {useEffect, useState} from 'react';

import ErrorBoundary from '../shared/ErrorBoundary';
import ThemeContext from '../shared/ThemeContext';
import {DEFAULT_ERROR} from '../utils/constants';
import {openErrorToast} from '../utils/toasts';
import EditSXPBlueprintForm from './EditSXPBlueprintForm';

export default function ({context}) {
	const [resource, setResource] = useState(null);

	const url = new URL(window.location.href);
	const sxpBlueprintId = url.searchParams.get(
		`${context.namespace}sxpBlueprintId`
	);

	useEffect(() => {
		fetch(`/o/search-experiences-rest/sxp-blueprints/${sxpBlueprintId}`, {
			method: 'POST',
		})
			.then((response) => {
				if (!response.ok) {
					throw DEFAULT_ERROR;
				}

				return response.json();
			})
			.then((responseContent) => {
				setResource(responseContent);
			})
			.catch((error) => {
				openErrorToast();

				if (process.env.NODE_ENV === 'development') {
					console.error(error);
				}

				setResource({});
			});
	}, []); //eslint-disable-line

	if (!resource) {
		return null;
	}

	return (
		<ThemeContext.Provider value={context}>
			<div className="edit-sxp-blueprint-root">
				<ErrorBoundary>
					<EditSXPBlueprintForm
						entityJSON={resource.entityJSON}
						indexFields={resource.indexFields}
						initialConfigurationString={
							resource.initialConfigurationString
						}
						initialDescription={resource.initialDescription}
						initialSelectedSXPElementsString={
							resource.initialSelectedSXPElementsString
						}
						initialTitle={resource.initialTitle}
						keywordQueryContributors={
							resource.keywordQueryContributors
						}
						modelPrefilterContributors={
							resource.modelPrefilterContributors
						}
						queryPrefilterContributors={
							resource.queryPrefilterContributors
						}
						querySXPElements={resource.querySXPElements}
						redirectURL={resource.redirectURL}
						searchableTypes={resource.searchableTypes}
						sxpBlueprintId={sxpBlueprintId}
					/>
				</ErrorBoundary>
			</div>
		</ThemeContext.Provider>
	);
}
