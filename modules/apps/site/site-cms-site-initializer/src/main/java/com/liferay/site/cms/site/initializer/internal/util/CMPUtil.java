/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.site.cms.site.initializer.internal.util;

import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.service.ObjectDefinitionLocalServiceUtil;

/**
 * @author Kevin Tan
 */
public class CMPUtil {

	/**
	 * Returns <code>true</code> when CMP is deployed, turned on by its feature
	 * flag, and covered by a valid license. The CMP project object definition
	 * is absent when CMP is not deployed, is not reported as a CMP definition
	 * when the feature flag is off, and is deactivated when the license is
	 * missing.
	 */
	public static boolean isEnabled(long companyId) {
		ObjectDefinition objectDefinition =
			ObjectDefinitionLocalServiceUtil.
				fetchObjectDefinitionByExternalReferenceCode(
					_EXTERNAL_REFERENCE_CODE_CMP_PROJECT, companyId);

		if (objectDefinition == null) {
			return false;
		}

		if (objectDefinition.isCMP() && objectDefinition.isActive()) {
			return true;
		}

		return false;
	}

	private static final String _EXTERNAL_REFERENCE_CODE_CMP_PROJECT =
		"L_CMP_PROJECT";

}