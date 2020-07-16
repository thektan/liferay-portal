<%--
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
--%>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/frontend" prefix="liferay-frontend" %><%@
taglib uri="http://liferay.com/tld/react" prefix="react" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>

<%@ page import="com.liferay.portal.kernel.language.LanguageUtil" %><%@
page import="com.liferay.portal.kernel.util.Constants" %><%@
page import="com.liferay.portal.kernel.util.HashMapBuilder" %><%@
page import="com.liferay.portal.kernel.util.ParamUtil" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.constants.SearchConfigurationTypes" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.model.SearchConfiguration" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.web.internal.constants.SearchConfigurationMVCCommandNames" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.web.internal.constants.SearchConfigurationWebKeys" %>

<%@ page import="java.util.Map" %>

<liferay-frontend:defineObjects />

<liferay-theme:defineObjects />

<portlet:defineObjects />

<%
SearchConfiguration searchConfiguration = (SearchConfiguration)request.getAttribute(SearchConfigurationWebKeys.SEARCH_CONFIGURATION);

int searchConfigurationType = ParamUtil.getInteger(request, SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE, SearchConfigurationTypes.CONFIGURATION);

if (searchConfiguration != null) {
	searchConfigurationType = searchConfiguration.getType();
}

String pageTitleKey = (String)request.getAttribute(SearchConfigurationWebKeys.PAGE_TITLE_KEY);

renderResponse.setTitle(LanguageUtil.get(request, pageTitleKey));

Long configurationId = (searchConfiguration != null) ? searchConfiguration.getSearchConfigurationId() : null;
String cmd = (searchConfiguration != null) ? Constants.EDIT : Constants.ADD;

String redirect = ParamUtil.getString(request, "redirect", currentURL);
%>

<portlet:actionURL name="<%= SearchConfigurationMVCCommandNames.EDIT_SEARCH_CONFIGURATION %>" var="editConfigurationActionURL">
	<portlet:param name="redirect" value="<%= redirect %>" />
	<portlet:param name="<%= Constants.CMD %>" value="<%= cmd %>" />
</portlet:actionURL>

<aui:form action="<%= editConfigurationActionURL %>">
	<aui:input name="<%= SearchConfigurationWebKeys.SEARCH_CONFIGURATION_ID %>" type="hidden" value='<%= (searchConfiguration != null) ? searchConfiguration.getSearchConfigurationId() : "" %>' />
	<aui:input name="<%= SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE %>" type="hidden" value="<%= searchConfigurationType %>" />
	<aui:input name="redirect" type="hidden" value="<%= redirect %>" />

	<%
	Map<String, Object> props = HashMapBuilder.<String, Object>put(
		"configurationId", configurationId
	).put(
		"configurationType", searchConfigurationType
	).build();

	Map<String, Object> data = HashMapBuilder.<String, Object>put(
		"props", props
	).build();
	%>

	<react:component
		data="<%= data %>"
		module="js/ConfigurationSetApp"
	/>
</aui:form>