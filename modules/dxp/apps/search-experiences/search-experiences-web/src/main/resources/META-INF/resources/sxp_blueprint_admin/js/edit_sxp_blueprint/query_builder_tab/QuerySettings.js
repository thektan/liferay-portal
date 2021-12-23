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

import ClayForm, {ClayRadio, ClayRadioGroup, ClayToggle} from '@clayui/form';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import React, {useState} from 'react';

import SelectTypes from './SelectTypes';

function QuerySettings({
	applyIndexerClauses,
	onApplyIndexerClausesChange,
	frameworkConfig,
	onFrameworkConfigChange,
	searchableTypes = [],
}) {
	const [selectAllTypes, setSelectAllTypes] = useState(
		searchableTypes.length === frameworkConfig.searchableAssetTypes?.length
	);

	const _handleSelectAllTypesChange = (selectedAll) => {
		setSelectAllTypes(selectedAll);

		onFrameworkConfigChange({
			searchableAssetTypes: selectedAll
				? searchableTypes.map(({className}) => className)
				: [],
		});
	};

	const _handleApplyIndexerClausesChange = () => {
		onApplyIndexerClausesChange(!applyIndexerClauses);
	};

	return (
		<div className="query-settings">
			<ClayLayout.Row className="configuration-header" justify="between">
				<ClayLayout.Col size={12}>
					{Liferay.Language.get('query-settings')}
				</ClayLayout.Col>
			</ClayLayout.Row>

			<div className="sheet">
				<ClayPanel.Group flush>
					<ClayPanel
						className="searchable-types"
						collapsable
						displayTitle={Liferay.Language.get('searchable-types')}
						displayType="unstyled"
						showCollapseIcon
					>
						<ClayPanel.Body>
							<ClayRadioGroup
								onSelectedValueChange={
									_handleSelectAllTypesChange
								}
								selectedValue={selectAllTypes}
							>
								<ClayRadio
									label={Liferay.Language.get(
										'all-searchable-types'
									)}
									value={true}
								/>

								<ClayRadio
									label={Liferay.Language.get(
										'selected-types'
									)}
									value={false}
								/>
							</ClayRadioGroup>

							{!selectAllTypes && (
								<>
									<div className="sheet-text">
										{Liferay.Language.get(
											'select-the-searchable-types-description'
										)}
									</div>

									<SelectTypes
										onFrameworkConfigChange={
											onFrameworkConfigChange
										}
										searchableTypes={searchableTypes}
										selectedTypes={
											frameworkConfig.searchableAssetTypes
										}
									/>
								</>
							)}
						</ClayPanel.Body>
					</ClayPanel>

					<ClayPanel
						collapsable
						displayTitle={Liferay.Language.get(
							'search-framework-indexer-clauses'
						)}
						displayType="unstyled"
						showCollapseIcon
					>
						<ClayPanel.Body>
							<ClayToggle
								label={
									applyIndexerClauses
										? Liferay.Language.get('on')
										: Liferay.Language.get('off')
								}
								onToggle={_handleApplyIndexerClausesChange}
								toggled={!!applyIndexerClauses}
							/>

							{!applyIndexerClauses && (
								<div className="has-warning">
									<ClayForm.FeedbackItem>
										<ClayForm.FeedbackIndicator symbol="warning-full" />

										{Liferay.Language.get('warning-colon')}

										<span className="indexer-clauses-warning">
											{Liferay.Language.get(
												'search-framework-indexer-clauses-warning'
											)}
										</span>
									</ClayForm.FeedbackItem>
								</div>
							)}
						</ClayPanel.Body>
					</ClayPanel>
				</ClayPanel.Group>
			</div>
		</div>
	);
}

export default React.memo(QuerySettings);
