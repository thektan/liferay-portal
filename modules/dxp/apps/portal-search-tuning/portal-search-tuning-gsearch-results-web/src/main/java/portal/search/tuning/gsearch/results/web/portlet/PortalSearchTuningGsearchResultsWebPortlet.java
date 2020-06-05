package portal.search.tuning.gsearch.results.web.portlet;

import portal.search.tuning.gsearch.results.web.constants.PortalSearchTuningGsearchResultsWebPortletKeys;
import portal.search.tuning.gsearch.results.web.constants.PortalSearchTuningGsearchResultsWebWebKeys;

import com.liferay.frontend.js.loader.modules.extender.npm.JSPackage;
import com.liferay.frontend.js.loader.modules.extender.npm.NPMResolver;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import java.io.IOException;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author ktan
 */
@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.name=" + PortalSearchTuningGsearchResultsWebPortletKeys.PortalSearchTuningGsearchResultsWeb,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class PortalSearchTuningGsearchResultsWebPortlet extends MVCPortlet {

	@Override
	public void doView(
			RenderRequest renderRequest, RenderResponse renderResponse)
		throws IOException, PortletException {

		JSPackage jsPackage = _npmResolver.getJSPackage();

		renderRequest.setAttribute(
			PortalSearchTuningGsearchResultsWebWebKeys.BOOTSTRAP_REQUIRE,
			jsPackage.getResolvedId() + " as bootstrapRequire");

		super.doView(renderRequest, renderResponse);
	}

	@Reference
	private NPMResolver _npmResolver;

}