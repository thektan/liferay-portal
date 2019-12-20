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
<%@ taglib prefix="clay-ui" uri="http://liferay.com/tld/clay" %>
<%@ taglib prefix="liferay-frontend" uri="http://liferay.com/tld/frontend" %>

<%@ page import="com.liferay.portal.search.admin.web.internal.constants.SearchAdminWebKeys" %><%@
page import="com.liferay.portal.search.admin.web.internal.display.context.IndexActionsDisplayContext" %>
<%@ page import="com.liferay.portal.search.engine.ConnectionInformation" %>
<%@ page import="java.util.List" %>
<%@ page import="com.liferay.portal.kernel.util.Validator" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.liferay.portal.search.engine.NodeInformation" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>

<portlet:defineObjects />

<%
	IndexActionsDisplayContext indexActionsDisplayContext = (IndexActionsDisplayContext)request.getAttribute(
		SearchAdminWebKeys.INDEX_ACTIONS_DISPLAY_CONTEXT);
%>

<div class="container-fluid container-fluid-max-xl container-form-lg status-page-container">
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

	<%
	List<ConnectionInformation> connectionInformationList = indexActionsDisplayContext.getConnectionInformationList();

	if (Validator.isNull(connectionInformationList)) {
		connectionInformationList = new ArrayList<>();
	}
	%>
		<h2>
			<liferay-ui:message key="active-connections" />

			<span class="badge badge-secondary">
				<span class="badge-item badge-item-expand">
					<%= connectionInformationList.size() %>
				</span>
			</span>
		</h2>

		<c:choose>
			<c:when test="<%= connectionInformationList.size() > 0 %>">
				<%
					for (ConnectionInformation connectionInformation : connectionInformationList) {
				%>

				<div class="connection-info-item sheet sheet-lg">
					<div class="connection-info-item-header">
						<div class="connection-info-item-header-block">
							<h4 class="connection-id"><%= connectionInformation.getConnectionId() %></h4>

							<c:if test="<%= Validator.isNotNull(connectionInformation.getClusterName()) %>">
								<span class="connection-cluster-name text-secondary"><%= connectionInformation.getClusterName() %></span>
							</c:if>
						</div>

						<div class="connection-info-item-header-block">
							<div class="connection-health-indicator <%= connectionInformation.getHealth() %>">
								<clay-ui:icon symbol="simple-circle" />

								<span class="connection-health-indicator-text">
									<liferay-ui:message arguments="<%= new String[] {connectionInformation.getHealth()} %>" key="health-x" />
								</span>
							</div>
						</div>
					</div>

					<liferay-frontend:fieldset
						collapsed="<%= true %>"
						collapsible="<%= true %>"
						label="nodes"
					>
						<%
							List<NodeInformation> nodeInformationList = connectionInformation.getNodeInformationList();

							if (Validator.isNull(nodeInformationList)) {
								nodeInformationList = new ArrayList<>();

								NodeInformation nodeInformation = new NodeInformation();

								nodeInformation.setName("master-7.3.0");
								nodeInformation.setVersion("7.3.0");

								nodeInformationList.add(nodeInformation);
							}
						%>

						<liferay-ui:search-container
							curParam="cur1"
							deltaConfigurable="<%= false %>"
							emptyResultsMessage="no-nodes-found"
							headerNames="node-name,version"
							total="<%= nodeInformationList.size() %>"
						>
							<liferay-ui:search-container-results
								results="<%= nodeInformationList %>"
							/>

							<liferay-ui:search-container-row
								className="com.liferay.portal.search.engine.NodeInformation"
								escapedModel="<%= true %>"
								keyProperty="name"
								modelVar="curNodeInformation"
							>
								<liferay-ui:search-container-column-text property="name" />

								<liferay-ui:search-container-column-text property="version" />
							</liferay-ui:search-container-row>
						</liferay-ui:search-container>
					</liferay-frontend:fieldset>
				</div>

				<%
					}
				%>
			</c:when>
			<c:otherwise>
				<liferay-ui:alert message="no-active-connections" type="info" />
			</c:otherwise>
		</c:choose>
</div>
