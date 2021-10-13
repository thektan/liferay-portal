/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 *
 *
 *
 */

package com.liferay.search.experiences.web.internal.blueprint.portlet.action;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCRenderCommand;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.search.experiences.constants.SXPPortletKeys;
import com.liferay.search.experiences.web.internal.blueprint.constants.SXPBlueprintMVCCommandNames;
import com.liferay.search.experiences.web.internal.blueprint.constants.SXPBlueprintWebKeys;
import com.liferay.search.experiences.web.internal.blueprint.display.context.ViewSXPBlueprintsDisplayContext;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Petteri Karttunen
 */
@Component(
	immediate = true,
	property = {
		"javax.portlet.name=" + SXPPortletKeys.SXP_BLUEPRINT,
		"mvc.command.name=" + SXPBlueprintMVCCommandNames.VIEW_SXP_BLUEPRINTS,
		"mvc.command.name=/"
	},
	service = MVCRenderCommand.class
)
public class ViewSXPBlueprintsMVCRenderCommand implements MVCRenderCommand {

	@Override
	public String render(
			RenderRequest renderRequest, RenderResponse renderResponse)
		throws PortletException {

		ViewSXPBlueprintsDisplayContext viewSXPBlueprintsDisplayContext =
			_getViewBlueprintsDisplayContext(renderRequest, renderResponse);

		renderRequest.setAttribute(
			SXPBlueprintWebKeys.VIEW_SXP_BLUEPRINTS_DISPLAY_CONTEXT,
			viewSXPBlueprintsDisplayContext);

		return "/view.jsp";
	}

	private ViewSXPBlueprintsDisplayContext _getViewBlueprintsDisplayContext(
		RenderRequest renderRequest, RenderResponse renderResponse) {

		return new ViewSXPBlueprintsDisplayContext(
			_portal.getLiferayPortletRequest(renderRequest),
			_portal.getLiferayPortletResponse(renderResponse));
	}

	@Reference
	private Portal _portal;

}