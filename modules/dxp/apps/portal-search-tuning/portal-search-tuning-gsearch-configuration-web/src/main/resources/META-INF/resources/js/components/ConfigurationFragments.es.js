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
import ClayLayout from '@clayui/layout';
import {PropTypes} from 'prop-types';
import React from 'react';

export default function ConfigurationFragments({fragments = []}) {
	const emptyState = (
		<ClayEmptyState
			description={Liferay.Language.get(
				'add-a-configuration-fragment-to-begin-relevance-tuning'
			)}
			imgSrc="/o/admin-theme/images/states/empty_state.gif"
			title={Liferay.Language.get('there-are-no-configuration-fragments')}
		>
			<ClayButton displayType="secondary">
				{Liferay.Language.get('add-configuration-fragment')}
			</ClayButton>
		</ClayEmptyState>
	);

	return (
		<>
			<ClayLayout.SheetHeader className="bold configuration-header">
				{Liferay.Language.get('configuration-fragments')}
			</ClayLayout.SheetHeader>
			<ClayLayout.Sheet>
				{fragments.length === 0 ? emptyState : <></>}
			</ClayLayout.Sheet>
		</>
	);
}

ConfigurationFragments.propTypes = {
	fragments: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
		})
	),
};
