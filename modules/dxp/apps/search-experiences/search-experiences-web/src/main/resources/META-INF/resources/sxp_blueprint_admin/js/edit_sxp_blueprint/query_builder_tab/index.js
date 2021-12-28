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

import ClayLayout from '@clayui/layout';
import {ClayVerticalNav} from '@clayui/nav';
import {PropTypes} from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';

import ThemeContext from '../../shared/ThemeContext';
import {fetchData} from '../../utils/fetch';
import QueryElements from './QueryElements';
import QuerySettings from './QuerySettings';

const VERTICAL_NAV_KEYS = {
	QUERY_ELEMENTS: 'queryElements',
	QUERY_SETTINGS: 'querySettings',
};

function QueryBuilderTab({
	applyIndexerClauses,
	onApplyIndexerClausesChange,
	elementInstances,
	entityJSON,
	errors = [],
	frameworkConfig = {},
	isSubmitting,
	onBlur,
	onChange,
	onDeleteSXPElement,
	onFrameworkConfigChange,
	onToggleSidebar,
	setShowClauseContributors,
	setFieldTouched,
	setFieldValue,
	touched = [],
}) {
	const {locale} = useContext(ThemeContext);

	const [activeVerticalNavKey, setActiveVerticalNavKey] = useState(
		VERTICAL_NAV_KEYS.QUERY_ELEMENTS
	);
	const [searchableTypes, setSearchableTypes] = useState(null);
	const [indexFields, setIndexFields] = useState(null);
	const [keywordQueryContributors, setKeywordQueryContributors] = useState(
		null
	);
	const [
		modelPrefilterContributors,
		setModelPrefilterContributors,
	] = useState(null);
	const [
		queryPrefilterContributors,
		setQueryPrefilterContributors,
	] = useState(null);

	useEffect(() => {
		fetchData(
			`/o/search-experiences-rest/v1.0/searchable-asset-names/${locale}`,
			{method: 'GET'},
			(responseContent) => setSearchableTypes(responseContent.items),
			() => setSearchableTypes([])
		);

		fetchData(
			`/o/search-experiences-rest/v1.0/field-mapping-infos`,
			{method: 'GET'},
			(responseContent) => setIndexFields(responseContent.items),
			() => setIndexFields([])
		);

		[
			{
				setProperty: setKeywordQueryContributors,
				url:
					'/o/search-experiences-rest/v1.0/keyword-query-contributors',
			},
			{
				setProperty: setModelPrefilterContributors,
				url:
					'/o/search-experiences-rest/v1.0/model-prefilter-contributors',
			},
			{
				setProperty: setQueryPrefilterContributors,
				url:
					'/o/search-experiences-rest/v1.0/query-prefilter-contributors',
			},
		].forEach(({setProperty, url}) =>
			fetchData(
				url,
				{method: 'GET'},
				(responseContent) =>
					setProperty(
						responseContent.items
							.map(({className}) => className)
							.filter((item) => item)
							.sort()
					),
				() => setProperty([])
			)
		);
	}, []); //eslint-disable-line

	if (
		!searchableTypes ||
		!indexFields ||
		!keywordQueryContributors ||
		!modelPrefilterContributors ||
		!queryPrefilterContributors
	) {
		return null;
	}

	/**
	 * Handles navigating to a different vertical nav tab.
	 * @param {string} key A `VERTICAL_NAV_KEYS` value.
	 */
	const _handleClickVerticalNav = (verticalNavKey) => () => {
		setActiveVerticalNavKey(verticalNavKey);
	};

	return (
		<ClayLayout.ContainerFluid
			className="builder query-builder-tab"
			size="xl"
		>
			<div className="builder-content-shift">
				<ClayLayout.Row>
					<ClayLayout.Col md={3} sm={12}>
						<ClayVerticalNav
							items={[
								{
									active:
										activeVerticalNavKey ===
										VERTICAL_NAV_KEYS.QUERY_ELEMENTS,
									label: Liferay.Language.get(
										'query-elements'
									),
									onClick: _handleClickVerticalNav(
										VERTICAL_NAV_KEYS.QUERY_ELEMENTS
									),
								},
								{
									active:
										activeVerticalNavKey ===
										VERTICAL_NAV_KEYS.QUERY_SETTINGS,
									label: Liferay.Language.get(
										'query-settings'
									),
									onClick: _handleClickVerticalNav(
										VERTICAL_NAV_KEYS.QUERY_SETTINGS
									),
								},
							]}
						/>
					</ClayLayout.Col>

					<ClayLayout.Col md={9} sm={12}>
						<div className="vertical-nav-content-wrapper">
							{activeVerticalNavKey ===
								VERTICAL_NAV_KEYS.QUERY_ELEMENTS && (
								<QueryElements
									elementInstances={elementInstances}
									entityJSON={entityJSON}
									errors={errors}
									frameworkConfig={frameworkConfig}
									indexFields={indexFields}
									isSubmitting={isSubmitting}
									onBlur={onBlur}
									onChange={onChange}
									onDeleteSXPElement={onDeleteSXPElement}
									onFrameworkConfigChange={
										onFrameworkConfigChange
									}
									onToggleSidebar={onToggleSidebar}
									setFieldTouched={setFieldTouched}
									setFieldValue={setFieldValue}
									touched={touched}
								/>
							)}

							{activeVerticalNavKey ===
								VERTICAL_NAV_KEYS.QUERY_SETTINGS && (
								<QuerySettings
									applyIndexerClauses={applyIndexerClauses}
									frameworkConfig={frameworkConfig}
									keywordQueryContributors={
										keywordQueryContributors
									}
									modelPrefilterContributors={
										modelPrefilterContributors
									}
									onApplyIndexerClausesChange={
										onApplyIndexerClausesChange
									}
									onFrameworkConfigChange={
										onFrameworkConfigChange
									}
									queryPrefilterContributors={
										queryPrefilterContributors
									}
									searchableTypes={searchableTypes}
									setShowClauseContributors={
										setShowClauseContributors
									}
								/>
							)}
						</div>
					</ClayLayout.Col>
				</ClayLayout.Row>
			</div>
		</ClayLayout.ContainerFluid>
	);
}

QueryBuilderTab.propTypes = {
	elementInstances: PropTypes.arrayOf(PropTypes.object),
	entityJSON: PropTypes.object,
	errors: PropTypes.arrayOf(PropTypes.object),
	frameworkConfig: PropTypes.object,
	isSubmitting: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onDeleteSXPElement: PropTypes.func,
	onFrameworkConfigChange: PropTypes.func,
	onToggleSidebar: PropTypes.func,
	setFieldTouched: PropTypes.func,
	setFieldValue: PropTypes.func,
	touched: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(QueryBuilderTab);
