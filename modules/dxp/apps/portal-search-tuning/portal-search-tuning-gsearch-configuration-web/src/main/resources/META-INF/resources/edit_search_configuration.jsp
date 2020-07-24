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
page import="com.liferay.portal.kernel.util.ParamUtil" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.constants.SearchConfigurationTypes" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.model.SearchConfiguration" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.web.internal.constants.SearchConfigurationMVCCommandNames" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.web.internal.constants.SearchConfigurationWebKeys" %><%@
page import="com.liferay.portal.search.tuning.gsearch.configuration.web.internal.display.context.EditSearchConfigurationDisplayContext" %>

<liferay-frontend:defineObjects />

<liferay-theme:defineObjects />

<portlet:defineObjects />

<%
SearchConfiguration searchConfiguration = (SearchConfiguration)request.getAttribute(SearchConfigurationWebKeys.SEARCH_CONFIGURATION);

EditSearchConfigurationDisplayContext editSearchConfigurationDisplayContext = (EditSearchConfigurationDisplayContext)request.getAttribute(SearchConfigurationWebKeys.EDIT_SEARCH_CONFIGURATION_DISPLAY_CONTEXT);

int searchConfigurationType = ParamUtil.getInteger(request, SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE, SearchConfigurationTypes.CONFIGURATION);

if (searchConfiguration != null) {
	searchConfigurationType = searchConfiguration.getType();
}

String pageTitleKey = (String)request.getAttribute(SearchConfigurationWebKeys.PAGE_TITLE_KEY);

renderResponse.setTitle(LanguageUtil.get(request, pageTitleKey));

String cmd = (searchConfiguration != null) ? Constants.EDIT : Constants.ADD;
%>

<portlet:actionURL name="<%= SearchConfigurationMVCCommandNames.EDIT_SEARCH_CONFIGURATION %>" var="editConfigurationActionURL">
	<portlet:param name="redirect" value="<%= editSearchConfigurationDisplayContext.getRedirect() %>" />
	<portlet:param name="<%= Constants.CMD %>" value="<%= cmd %>" />
</portlet:actionURL>

<aui:form action="<%= editConfigurationActionURL %>">
	<aui:input name="<%= SearchConfigurationWebKeys.SEARCH_CONFIGURATION_ID %>" type="hidden" value='<%= (searchConfiguration != null) ? searchConfiguration.getSearchConfigurationId() : "" %>' />
	<aui:input name="<%= SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE %>" type="hidden" value="<%= searchConfigurationType %>" />
	<aui:input name="redirect" type="hidden" value="<%= editSearchConfigurationDisplayContext.getRedirect() %>" />

	<react:component
		data="<%= editSearchConfigurationDisplayContext.getData() %>"
		module="js/ConfigurationSetApp"
	/>
</aui:form>