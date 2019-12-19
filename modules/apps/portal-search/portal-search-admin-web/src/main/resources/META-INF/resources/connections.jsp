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

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<%@ page import="com.liferay.portal.search.admin.web.internal.constants.SearchAdminWebKeys" %><%@
page import="com.liferay.portal.search.admin.web.internal.display.context.IndexActionsDisplayContext" %>

<portlet:defineObjects />

<%
	IndexActionsDisplayContext indexActionsDisplayContext = (IndexActionsDisplayContext)request.getAttribute(
		SearchAdminWebKeys.INDEX_ACTIONS_DISPLAY_CONTEXT);
%>

<div class="container-fluid container-fluid-max-xl container-form-lg">
	<div class="sheet sheet-lg">
		<c:choose>
			<c:when test="<%= !indexActionsDisplayContext.isMissingSearchEngine() %>">
				<dl>
					<dt><liferay-ui:message key="search-engine-vendor" /></dt>
					<dd><%= indexActionsDisplayContext.getVendorString() %></dd>

					<dt><liferay-ui:message key="client-version" /></dt>
					<dd><%= indexActionsDisplayContext.getClientVersionString() %></dd>
				</dl>
			</c:when>
			<c:otherwise>
				<div class="alert alert-warning">
					<liferay-ui:message key="no-search-engine-detected-help" />
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</div>
