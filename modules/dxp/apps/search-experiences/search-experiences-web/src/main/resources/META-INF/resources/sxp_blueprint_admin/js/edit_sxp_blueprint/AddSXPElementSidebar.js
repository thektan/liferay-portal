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

import ClayButton from '@clayui/button';
import ClayEmptyState from '@clayui/empty-state';
import ClayIcon from '@clayui/icon';
import ClayList from '@clayui/list';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import ClaySticker from '@clayui/sticker';
import {useIsMounted} from '@liferay/frontend-js-react-web';
import getCN from 'classnames';
import PropTypes from 'prop-types';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import SearchInput from '../shared/SearchInput';
import ThemeContext from '../shared/ThemeContext';
import {CUSTOM_JSON_SXP_ELEMENT, DEFAULT_SXP_ELEMENT_ICON} from '../utils/data';
import {addParams, fetchData} from '../utils/fetch';
import {getLocalizedText} from '../utils/language';

const DEFAULT_CATEGORY = 'other';
const DEFAULT_EXPANDED_LIST = ['match'];

const LAST_CATEGORIES = [DEFAULT_CATEGORY, 'custom'];

const SXPElementListItem = ({
	description,
	icon = DEFAULT_SXP_ELEMENT_ICON,
	id,
	onClick,
	title,
}) => {
	return (
		<ClayList.Item className="sxp-element-item" flex key={id}>
			<ClayList.ItemField>
				<ClaySticker size="md">
					<ClayIcon symbol={icon} />
				</ClaySticker>
			</ClayList.ItemField>

			<ClayList.ItemField expand>
				{title && <ClayList.ItemTitle>{title}</ClayList.ItemTitle>}

				{description && (
					<ClayList.ItemText subtext={true}>
						{description}
					</ClayList.ItemText>
				)}
			</ClayList.ItemField>

			<ClayList.ItemField>
				<div className="add-sxp-element-button-background" />

				<ClayButton
					aria-label={Liferay.Language.get('add')}
					className="add-sxp-element-button"
					displayType="secondary"
					onClick={onClick}
					small
				>
					{Liferay.Language.get('add')}
				</ClayButton>
			</ClayList.ItemField>
		</ClayList.Item>
	);
};

const SXPElementList = ({category, expand, onAddSXPElement, sxpElements}) => {
	const [showList, setShowList] = useState(expand);

	const {locale} = useContext(ThemeContext);

	useEffect(() => {
		setShowList(expand);
	}, [expand]);

	const _handleAddSXPElement = ({
		description_i18n,
		elementDefinition,
		title_i18n,
	}) => () => {
		onAddSXPElement({description_i18n, elementDefinition, title_i18n});
	};

	return (
		<>
			{!!category && (
				<ClayButton
					className="panel-header sidebar-dt"
					displayType="unstyled"
					onClick={() => setShowList(!showList)}
				>
					<span>{category}</span>

					<span className="sidebar-arrow">
						<ClayIcon
							symbol={showList ? 'angle-down' : 'angle-right'}
						/>
					</span>
				</ClayButton>
			)}

			{showList && (
				<ClayList>
					{sxpElements.map((sxpElement, index) => (
						<SXPElementListItem
							description={getLocalizedText(
								sxpElement.description_i18n,
								locale
							)}
							icon={sxpElement.elementDefinition?.icon}
							id={sxpElement.id}
							key={index}
							onClick={_handleAddSXPElement(sxpElement)}
							title={getLocalizedText(
								sxpElement.title_i18n,
								locale
							)}
						/>
					))}
				</ClayList>
			)}
		</>
	);
};

function AddSXPElement({
	emptyMessage = Liferay.Language.get('no-query-elements-found'),
	onAddSXPElement,
	sxpElements,
}) {
	const {locale} = useContext(ThemeContext);

	const [loading, setLoading] = useState(true);

	const [filteredSXPElements, setFilteredSXPElements] = useState(sxpElements);

	const [categories, setCategories] = useState([]);
	const [categorizedSXPElements, setCategorizedSXPElements] = useState({});
	const [expandAll, setExpandAll] = useState(false);

	const _categorizeSXPElements = (sxpElements) => {
		const newCategories = [];
		const newCategorizedSXPElements = {};

		sxpElements.map((sxpElement) => {
			const category =
				sxpElement.elementDefinition?.category || DEFAULT_CATEGORY;

			newCategorizedSXPElements[category] = [
				...(newCategorizedSXPElements[category] || []),
				sxpElement,
			];

			// Don't add last categories since they will be added in the
			// `setCategories` call below

			if (
				!newCategories.includes(category) &&
				!LAST_CATEGORIES.includes(category)
			) {
				newCategories.push(category);
			}
		});

		setCategories([
			...newCategories.sort(),
			...LAST_CATEGORIES.filter(
				(category) =>
					newCategorizedSXPElements[category] &&
					newCategorizedSXPElements[category].length
			), // Add last categories unless there are no elements
		]);

		setCategorizedSXPElements(newCategorizedSXPElements);
	};

	useEffect(() => {
		_categorizeSXPElements(sxpElements);

		setLoading(false);
	}, [sxpElements]);

	const _handleSearchChange = useCallback(
		(value) => {
			const newSXPElements = sxpElements.filter((sxpElement) => {
				if (value) {
					const sxpElementTitle = getLocalizedText(
						sxpElement.title_i18n,
						locale
					);

					return sxpElementTitle
						.toLowerCase()
						.includes(value.toLowerCase());
				}

				return true;
			});

			_categorizeSXPElements(newSXPElements);
			setFilteredSXPElements(newSXPElements);
			setExpandAll(!!value);
		},
		[sxpElements, locale]
	);

	return (
		<>
			<nav className="component-tbar sidebar-search tbar">
				<div className="container-fluid">
					<SearchInput onChange={_handleSearchChange} />
				</div>
			</nav>

			{!loading ? (
				filteredSXPElements.length ? (
					<div className="sxp-element-list">
						{categories.map((category) => (
							<SXPElementList
								category={category}
								expand={
									expandAll ||
									DEFAULT_EXPANDED_LIST.includes(category)
								}
								key={category}
								onAddSXPElement={onAddSXPElement}
								sxpElements={categorizedSXPElements[category]}
							/>
						))}
					</div>
				) : (
					<div className="empty-list-message">
						<ClayEmptyState description="" title={emptyMessage} />
					</div>
				)
			) : (
				<ClayLoadingIndicator />
			)}
		</>
	);
}

function AddSXPElementSidebar({
	emptyMessage,
	onAddSXPElement,
	onClose,
	visible,
}) {
	const isMounted = useIsMounted();

	const [sxpElements, setSXPElements] = useState(null);

	// TODO check pagesize

	useEffect(() => {
		fetchData(
			addParams('/o/search-experiences-rest/v1.0/sxp-elements', {
				pageSize: 200,
			}),
			{method: 'GET'},
			(responseContent) => {
				if (isMounted()) {
					setSXPElements([
						...responseContent.items,
						CUSTOM_JSON_SXP_ELEMENT,
					]);
				}
			},
			() => {
				if (isMounted()) {
					setSXPElements([CUSTOM_JSON_SXP_ELEMENT]);
				}
			}
		);
	}, []); //eslint-disable-line

	if (!sxpElements) {
		return null;
	}

	return (
		<div
			className={getCN(
				'add-sxp-element-sidebar',
				'sidebar',
				'sidebar-light',
				{open: visible}
			)}
		>
			<div className="sidebar-header">
				<h4 className="component-title">
					<span className="text-truncate-inline">
						<span className="text-truncate">
							{Liferay.Language.get('add-query-elements')}
						</span>
					</span>
				</h4>

				<ClayButton
					aria-label={Liferay.Language.get('close')}
					displayType="unstyled"
					onClick={onClose}
					small
				>
					<ClayIcon symbol="times" />
				</ClayButton>
			</div>

			<AddSXPElement
				emptyMessage={emptyMessage}
				onAddSXPElement={onAddSXPElement}
				sxpElements={sxpElements}
			/>
		</div>
	);
}

AddSXPElementSidebar.propTypes = {
	emptyMessage: PropTypes.string,
	onAddSXPElement: PropTypes.func,
	onClose: PropTypes.func,
	visible: PropTypes.bool,
};

export default React.memo(AddSXPElementSidebar);
