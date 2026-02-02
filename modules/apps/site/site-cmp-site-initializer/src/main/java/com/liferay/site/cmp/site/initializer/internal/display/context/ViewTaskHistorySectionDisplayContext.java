/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.site.cmp.site.initializer.internal.display.context;

import com.liferay.object.model.ObjectEntry;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.util.HashMapBuilder;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

/**
 * @author Carolina Barbosa
 */
public class ViewTaskHistorySectionDisplayContext {

	public ViewTaskHistorySectionDisplayContext(
		HttpServletRequest httpServletRequest, ObjectEntry objectEntry) {

		_httpServletRequest = httpServletRequest;
		_objectEntry = objectEntry;
	}

	public Map<String, Object> getProperties() throws Exception {
		return HashMapBuilder.<String, Object>put(
			"apiURL",
			StringBundler.concat(
				"/o/cmp/tasks/", _objectEntry.getObjectEntryId(),
				"?fields=auditEvents&nestedFields=auditEvents")
		).build();
	}

	private final HttpServletRequest _httpServletRequest;
	private final ObjectEntry _objectEntry;

}