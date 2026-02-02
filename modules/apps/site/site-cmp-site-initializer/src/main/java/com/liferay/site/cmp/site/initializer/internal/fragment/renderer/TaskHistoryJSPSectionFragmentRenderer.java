/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.site.cmp.site.initializer.internal.fragment.renderer;

import com.liferay.fragment.renderer.FragmentRenderer;
import com.liferay.info.constants.InfoDisplayWebKeys;
import com.liferay.object.model.ObjectEntry;
import com.liferay.site.cmp.site.initializer.internal.display.context.ViewTaskHistorySectionDisplayContext;

import jakarta.servlet.http.HttpServletRequest;

import org.osgi.service.component.annotations.Component;

/**
 * @author Carolina Barbosa
 */
@Component(service = FragmentRenderer.class)
public class TaskHistoryJSPSectionFragmentRenderer
	extends BaseJSPSectionFragmentRenderer
		<ViewTaskHistorySectionDisplayContext> {

	@Override
	public String getCollectionKey() {
		return "sections";
	}

	@Override
	protected ViewTaskHistorySectionDisplayContext getDisplayContext(
		HttpServletRequest httpServletRequest) {

		Object object = httpServletRequest.getAttribute(
			InfoDisplayWebKeys.INFO_ITEM);

		if (!(object instanceof ObjectEntry)) {
			return null;
		}

		return new ViewTaskHistorySectionDisplayContext(
			httpServletRequest, (ObjectEntry)object);
	}

	@Override
	protected String getJSPPath() {
		return "/view_task_history.jsp";
	}

	@Override
	protected String getLabelKey() {
		return "task-history";
	}

}