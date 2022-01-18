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

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayIcon from '@clayui/icon';
import React, {useEffect, useState} from 'react';

function Debugger({children, onRefresh}) {
	const [visible, setVisible] = useState(true);
	const [visibleBody, setVisibleBody] = useState(true);

	/**
	 * Used in conjunction with `_handleRefresh`.
	 */
	useEffect(() => {
		setVisibleBody(true);
	}, [visibleBody, setVisibleBody]);

	const _handleCloseDebugger = () => {
		setVisible(false);
	};

	const _handleOpenDebugger = () => {
		setVisible(true);
	};

	/**
	 * Forces code mirror to refresh in debugger body.
	 */
	const _handleRefresh = () => {
		if (onRefresh) {
			onRefresh();
		}

		setVisibleBody(false);
	};

	return (
		<div className="debugger-container">
			{!visible && (
				<ClayButtonWithIcon
					displayType="secondary"
					onClick={_handleOpenDebugger}
					symbol="document-code"
					title="Debugger"
				/>
			)}

			{visible && (
				<div className="card debugger-card">
					<h5 className="card-header">
						<span>Debugger</span>

						<ClayButton.Group>
							<ClayButton
								displayType="unstyled"
								onClick={_handleRefresh}
								small
								title="Reload"
							>
								<ClayIcon symbol="reload" />
							</ClayButton>

							<ClayButton
								displayType="unstyled"
								onClick={_handleCloseDebugger}
								small
								title="Close"
							>
								<ClayIcon symbol="times" />
							</ClayButton>
						</ClayButton.Group>
					</h5>

					<div className="card-body">{visibleBody && children}</div>
				</div>
			)}
		</div>
	);
}

export default React.memo(Debugger);
