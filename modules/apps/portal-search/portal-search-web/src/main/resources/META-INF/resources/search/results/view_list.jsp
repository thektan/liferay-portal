<%--
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ taglib uri="http://liferay.com/tld/frontend" prefix="liferay-frontend" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>

<%@ page import="com.liferay.info.constants.InfoDisplayWebKeys" %><%@
page import="com.liferay.portal.kernel.search.Document" %><%@
page import="com.liferay.portal.search.web.provider.DocumentInfoDisplayContributor" %><%@
page import="com.liferay.portal.search.web.provider.DocumentInfoDisplayObjectProvider" %><%@
page import="com.liferay.portal.search.web.provider.DocumentInfoListProviderContext" %>

<%@ page import="java.util.List" %><%@
page import="java.util.Map" %>

<liferay-frontend:defineObjects />

<liferay-theme:defineObjects />

<%
Map<String, Object> dataMap = (Map<String, Object>)request.getAttribute("DATA_MAP");
DocumentInfoDisplayContributor documentInfoDisplayContributor = (DocumentInfoDisplayContributor)request.getAttribute(InfoDisplayWebKeys.INFO_DISPLAY_CONTRIBUTOR);

DocumentInfoListProviderContext documentInfoListProviderContext = (DocumentInfoListProviderContext)dataMap.get("infoListProviderContext");
List<Document> infoList = (List<Document>)dataMap.get("infoList");
%>

<div class="search-total-label">
	<%= dataMap.get("total") %> Results for <%= dataMap.get("keywords") %>
</div>

<ul>

	<%
		for (Document document : infoList) {
			DocumentInfoDisplayObjectProvider documentInfoDisplayObjectProvider = (DocumentInfoDisplayObjectProvider)documentInfoDisplayContributor.getInfoDisplayObjectProvider(document, documentInfoListProviderContext);
	%>

	<li><%= documentInfoDisplayObjectProvider.getUID() %></li>

	<%
		}
	%>

</ul>