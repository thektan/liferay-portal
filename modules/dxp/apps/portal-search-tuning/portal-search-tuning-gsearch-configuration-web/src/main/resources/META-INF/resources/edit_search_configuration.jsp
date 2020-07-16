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

<%@ include file="./init.jsp" %>

<liferay-ui:error key="errorDetails">
	<liferay-ui:message arguments='<%= SessionErrors.get(liferayPortletRequest, "errorDetails") %>' key="error.search-configuration-service-error" />
</liferay-ui:error>

<liferay-ui:error key="titleEmpty" message="error.title-empty" />
<liferay-ui:error key="defaultLocaleTitleEmpty" message="error.default-locale-title-empty" />
<liferay-ui:error key="descriptioneEmpty" message="error.description-empty" />
<liferay-ui:error key="defaultLocaleDescriptionEmpty" message="error.default-locale-description-empty" />

<%
SearchConfiguration searchConfiguration = (SearchConfiguration)request.getAttribute(SearchConfigurationWebKeys.SEARCH_CONFIGURATION);

int searchConfigurationType = ParamUtil.getInteger(request, SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE, SearchConfigurationTypes.CONFIGURATION);

if (searchConfiguration != null) {
	searchConfigurationType = searchConfiguration.getType();
}

String pageTitleKey = (String)request.getAttribute(SearchConfigurationWebKeys.PAGE_TITLE_KEY);

renderResponse.setTitle(LanguageUtil.get(request, pageTitleKey));

String cmd = (searchConfiguration != null) ? Constants.EDIT : Constants.ADD;

String redirect = ParamUtil.getString(request, "redirect", currentURL);
%>

<portlet:actionURL name="<%= SearchConfigurationMVCCommandNames.EDIT_SEARCH_CONFIGURATION %>" var="editConfigurationActionURL">
	<portlet:param name="redirect" value="<%= redirect %>" />
	<portlet:param name="<%= Constants.CMD %>" value="<%= cmd %>" />
</portlet:actionURL>

<aui:model-context bean="<%= searchConfiguration %>" model="<%= SearchConfiguration.class %>" />

<aui:form action="<%= editConfigurationActionURL%>" >
	<aui:input name="<%= SearchConfigurationWebKeys.SEARCH_CONFIGURATION_ID %>" type="hidden" value='<%= (searchConfiguration != null) ? searchConfiguration.getSearchConfigurationId() : "" %>' />
	<aui:input name="<%= SearchConfigurationWebKeys.SEARCH_CONFIGURATION_TYPE %>" type="hidden" value="<%= searchConfigurationType %>" />
	<aui:input name="redirect" type="hidden" value="<%= redirect %>" />

	<react:component
		module="js/ConfigurationSetApp.es.js"
	/>
</aui:form>
