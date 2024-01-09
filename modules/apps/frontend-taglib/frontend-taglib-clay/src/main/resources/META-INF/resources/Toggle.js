/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {ClayToggle} from '@clayui/form';
import React, {useState} from 'react';

export default function Toggle({
	additionalProps: _additionalProps,
	componentId: _componentId,
	cssClass,
	label,
	labelOff,
	labelOn,
	locale: _locale,
	portletId: _portletId,
	portletNamespace: _portletNamespace,
	toggled: _initialToggled,
	...otherProps
}) {
	const [toggled, setToggled] = useState(_initialToggled);

	return (
		<ClayToggle
			className={cssClass}
			label={(toggled ? labelOn : labelOff) ?? label}
			onToggle={setToggled}
			toggled={toggled}
			{...otherProps}
		/>
	);
}
