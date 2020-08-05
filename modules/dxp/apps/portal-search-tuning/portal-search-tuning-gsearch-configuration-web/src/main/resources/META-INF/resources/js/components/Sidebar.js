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
import {ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayList from '@clayui/list';
import ClaySticker from '@clayui/sticker';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const DEFAULT_LANGUAGE = 'en_US';

export default function Sidebar({addFragment, queryFragments}) {
	const [showAdd, setShowAdd] = useState(-1);

	return (
		<div className="sidebar sidebar-light">
			<div className="sidebar-header">
				<h4 className="component-title">
					<span className="text-truncate-inline">
						<span className="text-truncate">
							{Liferay.Language.get('add-query-fragments')}
						</span>
					</span>
				</h4>
			</div>
			<nav className="component-tbar tbar">
				<div className="container-fluid">
					<ClayInput
						aria-label={Liferay.Language.get('search')}
						placeholder={Liferay.Language.get('search')}
						type="text"
					/>
				</div>
			</nav>

			<ClayList>
				{queryFragments.map((item, index) => {
					return (
						<ClayList.Item
							className={`${showAdd === index ? 'hover' : ''}`}
							flex
							key={index}
							onMouseEnter={() => setShowAdd(index)}
							onMouseLeave={() => setShowAdd(-1)}
						>
							<ClayList.ItemField>
								<ClaySticker
									className="icon"
									displayType="secondary"
								>
									<ClayIcon symbol={item.icon} />
								</ClaySticker>
							</ClayList.ItemField>

							<ClayList.ItemField expand>
								<ClayList.ItemTitle>
									{item.title[DEFAULT_LANGUAGE]}
								</ClayList.ItemTitle>

								<ClayList.ItemText subtext={true}>
									{item.description}
								</ClayList.ItemText>
							</ClayList.ItemField>

							<ClayList.ItemField>
								{showAdd === index && (
									<div className="button-wrapper">
										<div className="add-fragment-button">
											<ClayButton
												aria-label={Liferay.Language.get(
													'add'
												)}
												displayType="secondary"
												onClick={() =>
													addFragment(item)
												}
												small
											>
												{Liferay.Language.get('add')}
											</ClayButton>
										</div>
									</div>
								)}
							</ClayList.ItemField>
						</ClayList.Item>
					);
				})}
			</ClayList>
		</div>
	);
}

Sidebar.propTypes = {
	addFragment: PropTypes.func,
	queryFragments: PropTypes.arrayOf(PropTypes.object),
};
