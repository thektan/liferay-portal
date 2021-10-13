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

<%@ include file="/init.jsp" %>

<portlet:actionURL name="<%= SXPBlueprintMVCCommandNames.DELETE_SXP_ELEMENT %>" var="deleteSXPElementURL">
	<portlet:param name="redirect" value="<%= currentURL %>" />
</portlet:actionURL>

<portlet:actionURL name="<%= SXPBlueprintMVCCommandNames.EDIT_SXP_ELEMENT %>" var="hideSXPElementURL">
	<portlet:param name="redirect" value="<%= currentURL %>" />
	<portlet:param name="<%= Constants.CMD %>" value="<%= SXPBlueprintWebKeys.HIDE %>" />
	<portlet:param name="hidden" value="<%= Boolean.TRUE.toString() %>" />
</portlet:actionURL>

<portlet:actionURL name="<%= SXPBlueprintMVCCommandNames.EDIT_SXP_ELEMENT %>" var="showSXPElementURL">
	<portlet:param name="redirect" value="<%= currentURL %>" />
	<portlet:param name="<%= Constants.CMD %>" value="<%= SXPBlueprintWebKeys.HIDE %>" />
	<portlet:param name="hidden" value="<%= Boolean.FALSE.toString() %>" />
</portlet:actionURL>

<clay:management-toolbar
	additionalProps='<%=
		HashMapBuilder.<String, Object>put(
			"deleteSXPElementURL", deleteSXPElementURL
		).put(
			"hideSXPElementURL", hideSXPElementURL
		).put(
			"showSXPElementURL", showSXPElementURL
		).build()
	%>'
	managementToolbarDisplayContext="<%= (ViewSXPElementsManagementToolbarDisplayContext)request.getAttribute(SXPBlueprintWebKeys.VIEW_SXP_ELEMENTS_MANAGEMENT_TOOLBAR_DISPLAY_CONTEXT) %>"
	propsTransformer="js/view_sxp_elements/SXPElementEntriesManagementToolbarPropsTransformer"
	searchContainerId="sxpElementEntries"
	supportsBulkActions="<%= true %>"
/>