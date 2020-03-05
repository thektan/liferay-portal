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

package com.liferay.portal.search.web.provider;

import com.liferay.info.list.provider.InfoListProvider;
import com.liferay.info.list.provider.InfoListProviderContext;
import com.liferay.info.pagination.Pagination;
import com.liferay.info.sort.Sort;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.search.Document;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.search.searcher.SearchResponse;
import com.liferay.portal.search.web.internal.search.results.portlet.SearchResultsPortletPreferences;
import com.liferay.portal.search.web.portlet.shared.search.PortletSharedSearchRequest;
import com.liferay.portal.search.web.portlet.shared.search.PortletSharedSearchResponse;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(service = InfoListProvider.class)
public class DocumentProvider implements InfoListProvider<Document> {

	@Override
	public List<Document> getInfoList(
		InfoListProviderContext infoListProviderContext) {

		DocumentInfoListProviderContext
			searchResultSummaryInfoListProviderContext =
				(DocumentInfoListProviderContext)infoListProviderContext;

		PortletSharedSearchResponse portletSharedSearchResponse =
			searchResultSummaryInfoListProviderContext.
				getPortletSharedSearchResponse();
		SearchResultsPortletPreferences searchResultsPortletPreferences =
			searchResultSummaryInfoListProviderContext.
				getSearchResultsPortletPreferences();

		SearchResponse searchResponse =
			portletSharedSearchResponse.getFederatedSearchResponse(
				searchResultsPortletPreferences.
					getFederatedSearchKeyOptional());

		return searchResponse.getDocuments71();
	}

	@Override
	public List<Document> getInfoList(
		InfoListProviderContext infoListProviderContext, Pagination pagination,
		Sort sort) {

		// NOTE: Using getInfoMap instead to return a Map.

		return null;
	}

	@Override
	public int getInfoListCount(
		InfoListProviderContext infoListProviderContext) {

		DocumentInfoListProviderContext
			searchResultSummaryInfoListProviderContext =
				(DocumentInfoListProviderContext)infoListProviderContext;

		PortletSharedSearchResponse portletSharedSearchResponse =
			searchResultSummaryInfoListProviderContext.
				getPortletSharedSearchResponse();
		SearchResultsPortletPreferences searchResultsPortletPreferences =
			searchResultSummaryInfoListProviderContext.
				getSearchResultsPortletPreferences();

		SearchResponse searchResponse =
			portletSharedSearchResponse.getFederatedSearchResponse(
				searchResultsPortletPreferences.
					getFederatedSearchKeyOptional());

		return searchResponse.getTotalHits();
	}

	public Map<String, Object> getInfoMap(
		InfoListProviderContext infoListProviderContext) {

		return HashMapBuilder.<String, Object>put(
			"infoList", getInfoList(infoListProviderContext)
		).put(
			"infoListProviderContext", infoListProviderContext
		).put(
			"keywords", getKeywords(infoListProviderContext)
		).put(
			"total", getInfoListCount(infoListProviderContext)
		).build();
	}

	public String getKeywords(InfoListProviderContext infoListProviderContext) {
		DocumentInfoListProviderContext
			searchResultSummaryInfoListProviderContext =
				(DocumentInfoListProviderContext)infoListProviderContext;

		PortletSharedSearchResponse portletSharedSearchResponse =
			searchResultSummaryInfoListProviderContext.
				getPortletSharedSearchResponse();

		Optional<String> keywordsOptional =
			portletSharedSearchResponse.getKeywordsOptional();

		return keywordsOptional.orElse(StringPool.BLANK);
	}

	@Override
	public String getLabel(Locale locale) {
		return "Search Results Documents";
	}

	@Reference
	protected PortletSharedSearchRequest portletSharedSearchRequest;

}