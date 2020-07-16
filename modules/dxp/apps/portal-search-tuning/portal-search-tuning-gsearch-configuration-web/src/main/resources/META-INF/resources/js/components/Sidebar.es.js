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
import ClaySticker from '@clayui/sticker';
import {PropTypes} from 'prop-types';
import React, {useState} from 'react';

export default function Sidebar() {
	const [showAdd, setShowAdd] = useState(-1);
	const queryFragments = [
		{
			description:
				'broadest-query-catching-documents-matching-any-keyword',
			icon: 'pin',
			title: 'matches-any-keyword',
		},
		{
			description: 'boost-content-last-modified-within-a-time-frame',
			icon: 'pin',
			title: 'freshness',
		},
		{
			description: "boost-content-created-closer-to-user's-location",
			icon: 'pin',
			title: "user's-geolocation",
		},
	];

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
						placeholder={Liferay.Language.get('search')}
						type="text"
					/>
				</div>
			</nav>

			<ul className="list-group">
				{queryFragments.map((item, index) => {
					return (
						<li
							className={`sidebar-list-item list-group-item list-group-item-flex ${
								showAdd === index ? 'hover' : ''
							}`}
							key={index}
							onMouseEnter={() => setShowAdd(index)}
							onMouseLeave={() => setShowAdd(-1)}
						>
							<div className="autofit-col">
								<ClaySticker
									className="icon-lighten"
									displayType="secondary"
								>
									<ClayIcon symbol={item.icon} />
								</ClaySticker>
							</div>
							<div className="autofit-col autofit-col-expand">
								<section className="autofit-section">
									<div className="list-group-title">
										{item.title}
									</div>

									<div className="list-group-subtitle">
										{item.description}
									</div>
								</section>
							</div>
							{showAdd === index && (
								<ClayButton
									className="add-fragment-button"
									displayType="secondary"
									small
								>
									{Liferay.Language.get('add')}
								</ClayButton>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

Sidebar.propTypes = {
	sample: PropTypes.string,
};
