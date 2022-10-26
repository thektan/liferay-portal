/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import {fetch} from 'frontend-js-web';
import React, {useState} from 'react';

function TestConnectionButton({txtaiHostAddress}) {
	const [loading, setLoading] = useState(false);
	const [testResultsMessage, setTestResultsMessage] = useState({}); // {message, type}

	const _handleClick = () => {
		setLoading(true);

		fetch(
			'/o/search-experiences-rest/v1.0/sentence-transformer/validate-configuration',
			{
				body: JSON.stringify({
					txtaiHostAddress,
				}),
				headers: new Headers({
					'Accept': 'application/json',
					'Accept-Language': Liferay.ThemeDisplay.getBCP47LanguageId(),
					'Content-Type': 'application/json',
				}),
				method: 'POST',
			}
		)
			.then((response) => response.json())
			.then((responseData) => {
				setTimeout(() => {
					setTestResultsMessage({
						message: Liferay.Language.get(
							'connection-is-successful'
						),
						type: 'success',
					});

					setLoading(false);
				}, 2000);

				console.log(responseData);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	return (
		<div className="test-connection-button-root">
			<ClayButton
				disabled={loading}
				displayType="secondary"
				onClick={_handleClick}
			>
				{loading && (
					<span className="inline-item inline-item-before">
						<ClayLoadingIndicator small />
					</span>
				)}

				{Liferay.Language.get('test-connection')}
			</ClayButton>

			{!!testResultsMessage.message && (
				<div className="test-connection-button-results">
					<ClayAlert
						className="mt-2"
						displayType={testResultsMessage.type}
						title={testResultsMessage.message}
						variant="feedback"
					/>
				</div>
			)}
		</div>
	);
}

export default TestConnectionButton;
