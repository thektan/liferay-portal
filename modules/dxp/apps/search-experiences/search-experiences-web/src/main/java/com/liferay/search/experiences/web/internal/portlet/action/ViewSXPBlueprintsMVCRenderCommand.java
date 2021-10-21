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

package com.liferay.search.experiences.web.internal.portlet.action;

import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCRenderCommand;
import com.liferay.portal.kernel.servlet.SessionErrors;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.search.experiences.constants.SXPPortletKeys;
import com.liferay.search.experiences.web.internal.constants.SXPBlueprintWebKeys;
import com.liferay.search.experiences.web.internal.display.context.ViewSXPBlueprintsDisplayContext;
import com.liferay.search.experiences.web.internal.display.context.ViewSXPBlueprintsManagementToolbarDisplayContext;

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
		"javax.portlet.name=" + SXPPortletKeys.SXP_BLUEPRINT_ADMIN,
		"mvc.command.name=/",
		"mvc.command.name=/sxp_blueprint_admin/view_sxp_blueprints"
	},
	service = MVCRenderCommand.class
)
public class ViewSXPBlueprintsMVCRenderCommand implements MVCRenderCommand {

	@Override
	public String render(
			RenderRequest renderRequest, RenderResponse renderResponse)
		throws PortletException {

<<<<<<< HEAD
		return "/sxp_blueprint_admin/view.jsp";
=======
		ViewSXPBlueprintsDisplayContext viewSXPBlueprintsDisplayContext =
			_getViewBlueprintsDisplayContext(renderRequest, renderResponse);

		renderRequest.setAttribute(
			SXPBlueprintWebKeys.VIEW_SXP_BLUEPRINTS_DISPLAY_CONTEXT,
			viewSXPBlueprintsDisplayContext);

		_setSXPBlueprintsManagementToolbar(
			renderRequest, renderResponse, viewSXPBlueprintsDisplayContext);

		return "/sxp_blueprints_admin/view.jsp";
>>>>>>> e4802e103127 (LPS-140994 search-experiences-web: Add View display context to render command)
	}

		private ViewSXPBlueprintsDisplayContext _getViewBlueprintsDisplayContext(
		RenderRequest renderRequest, RenderResponse renderResponse) {

		return new ViewSXPBlueprintsDisplayContext(
			_portal.getLiferayPortletRequest(renderRequest),
			_portal.getLiferayPortletResponse(renderResponse));
	}

	private void _setSXPBlueprintsManagementToolbar(
		RenderRequest renderRequest, RenderResponse renderResponse,
		ViewSXPBlueprintsDisplayContext viewSXPBlueprintsDisplayContext) {

		try {
			ViewSXPBlueprintsManagementToolbarDisplayContext
				viewSXPBlueprintsManagementToolbarDisplayContext =
					new ViewSXPBlueprintsManagementToolbarDisplayContext(
						_portal.getLiferayPortletRequest(renderRequest),
						_portal.getLiferayPortletResponse(renderResponse),
						viewSXPBlueprintsDisplayContext.getSearchContainer(),
						viewSXPBlueprintsDisplayContext.getDisplayStyle());

			renderRequest.setAttribute(
				SXPBlueprintWebKeys.
					VIEW_SXP_BLUEPRINTS_MANAGEMENT_TOOLBAR_DISPLAY_CONTEXT,
				viewSXPBlueprintsManagementToolbarDisplayContext);
		}
		catch (PortalException | PortletException exception) {
			_log.error(exception.getMessage(), exception);

			SessionErrors.add(renderRequest, exception.getClass());
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		ViewSXPBlueprintsMVCRenderCommand.class);

	@Reference
	private Portal _portal;

}