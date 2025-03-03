/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayForm, {ClayInput, ClaySelectWithOption, ClayToggle} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayLayout from '@clayui/layout';
import ClayNavigationBar from '@clayui/navigation-bar';
import ClayToolbar from '@clayui/toolbar';
import React, {useState} from 'react';

const VISIBILITY_OPTIONS = [
    Liferay.Language.get('public'),
    Liferay.Language.get('private'),
].map((label) => ({
    label,
    value: label,
}));

export default function EditGeneralInfo () {

    const [toggled, setToggle] = useState(true);

    return (
        <div className="vertical-nav-content-wrapper">
            <ClayForm.Group className="p-4">
                <div className="form-title">
                    {Liferay.Language.get('basic-info')}
                </div>

                <label>
                    {Liferay.Language.get('name')}
                    <ClayIcon
                        className="c-ml-1 reference-mark"
                        focusable="false"
                        role="presentation"
                        symbol="asterisk"
                    />
                </label>
                <ClayInput
                    id="basicInputText"
                    required
                    type="text"/>

                <label>
                    {Liferay.Language.get('description')}
                </label>
                <ClayInput
                    component="textarea"
                    type="text"/>

                <ClayToggle
                    label={Liferay.Language.get('allow-multiple-categories')}
                    onToggle={setToggle}
                    toggled={toggled}
                />

                <label>
                    {Liferay.Language.get('visibility')}
                </label>
                <ClaySelectWithOption
                options={VISIBILITY_OPTIONS}
                />
            </ClayForm.Group>
            <ClayForm.Group className="p-4">
                <div className="form-title">
                    Space
                </div>
            </ClayForm.Group>
        </div>
    );
}