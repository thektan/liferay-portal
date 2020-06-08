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

<%@ taglib uri="http://liferay.com/tld/react" prefix="react" %>

<%@ page import="com.liferay.portal.kernel.util.ParamUtil" %>
<%@ page import="com.liferay.portal.kernel.util.HashMapBuilder" %>
<%@ page import="java.util.Map" %>

<%
Map<String, Object> data = HashMapBuilder.<String, Object>put(
	"searchKey", "LIFERAY_PORTAL"
).build();
%>

<react:component data="<%= data %>" module="js/search-bar/index" />