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

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<%@ page import="com.liferay.portal.kernel.dao.search.SearchContainer" %><%@
page import="com.liferay.portal.kernel.search.Document" %><%@
page import="com.liferay.portal.kernel.util.WebKeys" %><%@
page import="com.liferay.portal.search.web.internal.search.results.portlet.SearchResultsPortletDisplayContext" %><%@
page import="com.liferay.portal.search.web.provider.DocumentRenderer" %>

<portlet:defineObjects />

<%
SearchResultsPortletDisplayContext searchResultsPortletDisplayContext = (SearchResultsPortletDisplayContext)java.util.Objects.requireNonNull(request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT));

if (searchResultsPortletDisplayContext.isRenderNothing()) {
	return;
}

SearchContainer<Document> searchContainer = searchResultsPortletDisplayContext.getSearchContainer();

DocumentRenderer documentRenderer = (DocumentRenderer)request.getAttribute("DOCUMENT_RENDERER");
HttpServletRequest httpServletRequest = (HttpServletRequest)request.getAttribute("HTTP_SERVLET_REQUEST");
HttpServletResponse httpServletResponse = (HttpServletResponse)request.getAttribute("HTTP_SERVLET_RESPONSE");

documentRenderer.renderList(
	searchResultsPortletDisplayContext.getInfoMap(),
	httpServletRequest,
	httpServletResponse
);
%>

<aui:form useNamespace="<%= false %>">
	<liferay-ui:search-paginator
		id='<%= renderResponse.getNamespace() + "searchContainerTag" %>'
		markupView="lexicon"
		searchContainer="<%= searchContainer %>"
	/>
</aui:form>