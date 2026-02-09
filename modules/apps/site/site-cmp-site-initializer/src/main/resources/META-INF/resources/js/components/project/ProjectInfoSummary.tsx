/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import Label from '@clayui/label';
import {DateRenderer} from '@liferay/frontend-data-set-web';
import {openToast} from 'frontend-js-components-web';
import React, {useState} from 'react';

import {patchProjectById} from '../../utils/api';
import {displayStateSuccessToast} from '../../utils/toastUtil';
import InfoSummary from '../InfoSummary';
import StateSelector, {State} from '../StateSelector';
import User, {UserProps} from './User';

interface ProjectInfoSummaryProps {
	dueDate: string;
	initialState: string;
	manager: UserProps;
	projectId: string;
	sponsor: UserProps;
	states: State[];
	tags: string[];
}

export default function ProjectInfoSummary({
	dueDate,
	initialState,
	manager,
	projectId,
	sponsor,
	states,
	tags,
}: ProjectInfoSummaryProps) {
	const [selectedStateKey, setSelectedStateKey] = useState(initialState);
	const [stateSelectorDisabled, setStateSelectorDisabled] = useState(false);

	return (
		<InfoSummary
			defaultOpen={true}
			items={[
				{
					label: 'State',
					value: (
						<StateSelector
							disabled={stateSelectorDisabled}
							onChange={async (key: string) => {
								setStateSelectorDisabled(true);

								const response = await patchProjectById({
									body: {state: key},
									projectId,
								});

								if (response.ok) {
									setSelectedStateKey(key);

									displayStateSuccessToast();
								}
								else {
									openToast({
										message: Liferay.Language.get(
											'an-unexpected-system-error-occurred'
										),
										type: 'danger',
									});
								}

								setStateSelectorDisabled(false);
							}}
							selectedKey={selectedStateKey}
							states={states}
						/>
					),
				},
				{label: 'Manager', value: <User {...manager} />},
				{label: 'Sponsor', value: <User {...sponsor} />},
				{
					label: 'Due Date',
					value: DateRenderer({value: dueDate}) ?? '',
				},
				{
					label: 'Tags',
					value: (
						<div>
							{tags.map((tag) => (
								<Label key={tag}>{tag}</Label>
							))}
						</div>
					),
				},
			]}
		/>
	);
}
