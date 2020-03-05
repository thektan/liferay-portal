package com.liferay.portal.search.web.provider;

import com.liferay.info.list.provider.DefaultInfoListProviderContext;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.Group;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.search.web.internal.display.context.PortletURLFactory;
import com.liferay.portal.search.web.internal.display.context.SearchResultPreferences;
import com.liferay.portal.search.web.internal.result.display.builder.SearchResultSummaryDisplayBuilder;
import com.liferay.portal.search.web.internal.search.results.portlet.SearchResultsPortletPreferences;
import com.liferay.portal.search.web.portlet.shared.search.PortletSharedSearchResponse;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

public class DocumentInfoListProviderContext
	extends DefaultInfoListProviderContext {

	public DocumentInfoListProviderContext(Company company, User user) {
		super(company, user);
	}

	public DocumentInfoListProviderContext(Group group, User user) {
		super(group, user);
	}

	public PortletSharedSearchResponse getPortletSharedSearchResponse() {
		return _portletSharedSearchResponse;
	}

	public PortletURLFactory getPortletURLFactory() {
		return _portletURLFactory;
	}

	public RenderRequest getRenderRequest() {
		return _renderRequest;
	}

	public RenderResponse getRenderResponse() {
		return _renderResponse;
	}

	public SearchResultPreferences getSearchResultPreferences() {
		return _searchResultPreferences;
	}

	public SearchResultsPortletPreferences
		getSearchResultsPortletPreferences() {

		return _searchResultsPortletPreferences;
	}

	public SearchResultSummaryDisplayBuilder
		getSearchResultSummaryDisplayBuilder() {

		return _searchResultSummaryDisplayBuilder;
	}

	public ThemeDisplay getThemeDisplay() {
		return _themeDisplay;
	}

	public void setPortletSharedSearchResponse(
		PortletSharedSearchResponse portletSharedSearchResponse) {

		_portletSharedSearchResponse = portletSharedSearchResponse;
	}

	public void setPortletURLFactory(PortletURLFactory portletURLFactory) {
		_portletURLFactory = portletURLFactory;
	}

	public void setRenderRequest(RenderRequest renderRequest) {
		_renderRequest = renderRequest;
	}

	public void setRenderResponse(RenderResponse renderResponse) {
		_renderResponse = renderResponse;
	}

	public void setSearchResultPreferences(
		SearchResultPreferences searchResultPreferences) {

		_searchResultPreferences = searchResultPreferences;
	}

	public void setSearchResultsPortletPreferences(
		SearchResultsPortletPreferences searchResultsPortletPreferences) {

		_searchResultsPortletPreferences = searchResultsPortletPreferences;
	}

	public void setSearchResultSummaryDisplayBuilder(
		SearchResultSummaryDisplayBuilder searchResultSummaryDisplayBuilder) {

		_searchResultSummaryDisplayBuilder = searchResultSummaryDisplayBuilder;
	}

	public void setThemeDisplay(ThemeDisplay themeDisplay) {
		_themeDisplay = themeDisplay;
	}

	private PortletSharedSearchResponse _portletSharedSearchResponse;
	private PortletURLFactory _portletURLFactory;
	private RenderRequest _renderRequest;
	private RenderResponse _renderResponse;
	private SearchResultPreferences _searchResultPreferences;
	private SearchResultsPortletPreferences _searchResultsPortletPreferences;
	private SearchResultSummaryDisplayBuilder
		_searchResultSummaryDisplayBuilder;
	private ThemeDisplay _themeDisplay;

}