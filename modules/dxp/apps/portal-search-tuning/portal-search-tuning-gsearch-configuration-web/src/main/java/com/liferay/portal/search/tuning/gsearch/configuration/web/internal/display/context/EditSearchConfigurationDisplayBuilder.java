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

package com.liferay.portal.search.tuning.gsearch.configuration.web.internal.display.context;

import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.language.Language;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.HtmlUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.search.tuning.gsearch.configuration.constants.SearchConfigurationTypes;
import com.liferay.portal.search.tuning.gsearch.configuration.web.internal.constants.SearchConfigurationWebKeys;

import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import javax.portlet.PortletURL;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Kevin Tan
 */
public class EditSearchConfigurationDisplayBuilder {

	public EditSearchConfigurationDisplayBuilder(
		HttpServletRequest httpServletRequest, Language language,
		JSONFactory jsonFactory, RenderRequest renderRequest,
		RenderResponse renderResponse) {

		_httpServletRequest = httpServletRequest;
		_language = language;
		_jsonFactory = jsonFactory;
		_renderRequest = renderRequest;
		_renderResponse = renderResponse;

		_themeDisplay = (ThemeDisplay)_httpServletRequest.getAttribute(
			WebKeys.THEME_DISPLAY);
	}

	public EditSearchConfigurationDisplayContext build() {
		EditSearchConfigurationDisplayContext
			editSearchConfigurationDisplayContext =
				new EditSearchConfigurationDisplayContext();

		_setConfigurationType(editSearchConfigurationDisplayContext);
		_setData(editSearchConfigurationDisplayContext);
		_setRedirect(editSearchConfigurationDisplayContext);

		return editSearchConfigurationDisplayContext;
	}

	private JSONArray _getAvailableLocales() {
		JSONArray jsonArray = _jsonFactory.createJSONArray();

		Set<Locale> locales = _language.getAvailableLocales();

		Stream<Locale> stream = locales.stream();

		stream.map(
			this::_getLocaleJSONObject
		).forEach(
			jsonArray::put
		);

		return jsonArray;
	}

	private Map<String, Object> _getContext() {
		return HashMapBuilder.<String, Object>put(
			"namespace", _renderResponse.getNamespace()
		).build();
	}

	private JSONObject _getLocaleJSONObject(Locale locale) {
		JSONObject jsonObject = _jsonFactory.createJSONObject();

		String languageId = LocaleUtil.toLanguageId(locale);

		jsonObject.put(
			"label", StringUtil.replace(languageId, '_', "-")
		).put(
			"symbol",
			StringUtil.replace(
				languageId, '_', "-"
			).toLowerCase()
		);

		return jsonObject;
	}

	private Map<String, Object> _getProps() {
		return HashMapBuilder.<String, Object>put(
			"availableLocales", _getAvailableLocales()
		).put(
			"cancelURL", HtmlUtil.escape(_getRedirect())
		).build();
	}

	private String _getRedirect() {
		String redirect = ParamUtil.getString(_httpServletRequest, "redirect");

		if (Validator.isNull(redirect)) {
			PortletURL portletURL = _renderResponse.createRenderURL();

			redirect = portletURL.toString();
		}

		return redirect;
	}

	// @TODO Look into moving logic from EditSearchConfigurationMVCRenderCommand and edit_search_configuration.jsp

	private void _setConfigurationType(
		EditSearchConfigurationDisplayContext
			editSearchConfigurationDisplayContext) {

		editSearchConfigurationDisplayContext.setConfigurationType(
			ParamUtil.getInteger(
				_httpServletRequest,
				SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE,
				SearchConfigurationTypes.CONFIGURATION));
	}

	private void _setData(
		EditSearchConfigurationDisplayContext
			editSearchConfigurationDisplayContext) {

		editSearchConfigurationDisplayContext.setData(
			HashMapBuilder.<String, Object>put(
				"context", _getContext()
			).put(
				"props", _getProps()
			).build());
	}

	private void _setRedirect(
		EditSearchConfigurationDisplayContext
			editSearchConfigurationDisplayContext) {

		editSearchConfigurationDisplayContext.setRedirect(_getRedirect());
	}

	private final HttpServletRequest _httpServletRequest;
	private final JSONFactory _jsonFactory;
	private final Language _language;
	private final RenderRequest _renderRequest;
	private final RenderResponse _renderResponse;
	private final ThemeDisplay _themeDisplay;

}