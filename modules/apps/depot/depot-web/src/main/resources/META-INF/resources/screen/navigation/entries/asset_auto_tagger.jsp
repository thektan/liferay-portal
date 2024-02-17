<%--
/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
--%>

<%@ include file="/init.jsp" %>

<%
AssetAutoTaggerConfiguration assetAutoTaggerConfiguration = (AssetAutoTaggerConfiguration)request.getAttribute(AssetAutoTaggerConfiguration.class.getName());
%>

<c:if test="<%= assetAutoTaggerConfiguration.isAvailable() %>">
	<liferay-frontend:fieldset
		collapsible="<%= true %>"
		cssClass="panel-group-flush"
		label='<%= LanguageUtil.get(request, "asset-auto-tagging") %>'
	>
		<clay:toggle
			helpText="asset-library-asset-auto-tagging-help"
			id='<%= liferayPortletResponse.getNamespace() + "assetAutoTaggingEnabled" %>'
			label="enable-auto-tagging"
			name='<%= liferayPortletResponse.getNamespace() + "TypeSettingsProperties--assetAutoTaggingEnabled--" %>'
			toggled="<%= assetAutoTaggerConfiguration.isEnabled() %>"
		/>
	</liferay-frontend:fieldset>
</c:if>