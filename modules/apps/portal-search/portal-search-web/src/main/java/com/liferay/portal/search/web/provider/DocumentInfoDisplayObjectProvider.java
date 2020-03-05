package com.liferay.portal.search.web.provider;

import com.liferay.asset.kernel.service.AssetEntryLocalService;
import com.liferay.asset.util.AssetRendererFactoryLookup;
import com.liferay.info.display.contributor.InfoDisplayObjectProvider;
import com.liferay.info.item.renderer.InfoItemRendererTracker;
import com.liferay.info.list.provider.InfoListProviderTracker;
import com.liferay.portal.kernel.language.Language;
import com.liferay.portal.kernel.portlet.LiferayPortletRequest;
import com.liferay.portal.kernel.search.Document;
import com.liferay.portal.kernel.search.Field;
import com.liferay.portal.kernel.search.IndexerRegistry;
import com.liferay.portal.kernel.security.permission.ResourceActions;
import com.liferay.portal.kernel.service.GroupLocalService;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.FastDateFormatFactory;
import com.liferay.portal.kernel.util.Http;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.search.legacy.document.DocumentBuilderFactory;
import com.liferay.portal.search.summary.SummaryBuilderFactory;
import com.liferay.portal.search.web.internal.display.context.PortletURLFactory;
import com.liferay.portal.search.web.internal.display.context.SearchResultPreferences;
import com.liferay.portal.search.web.internal.portlet.shared.task.PortletSharedRequestHelper;
import com.liferay.portal.search.web.internal.result.display.builder.SearchResultSummaryDisplayBuilder;
import com.liferay.portal.search.web.internal.result.display.context.SearchResultSummaryDisplayContext;
import com.liferay.portal.search.web.internal.search.results.portlet.SearchResultsPortletPreferences;
import com.liferay.portal.search.web.portlet.shared.search.PortletSharedSearchRequest;
import com.liferay.portal.search.web.search.result.SearchResultImageContributor;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import javax.servlet.http.HttpServletRequest;

import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

public class DocumentInfoDisplayObjectProvider
	implements InfoDisplayObjectProvider<Document> {

	public DocumentInfoDisplayObjectProvider(
			Document document,
			DocumentInfoListProviderContext documentInfoListProviderContext)
		throws Exception {

		_document = document;

//		Commenting this out for now since I'm currently getting errors with
//		building the SearchResultSummaryDisplayContext since @Reference values
//		are null.
//
//		_searchResultSummaryDisplayContext = doBuildSummary(
//			document, documentInfoListProviderContext);
	}

	@Override
	public long getClassNameId() {
		return 0;
	}

	@Override
	public long getClassPK() {
		return 0;
	}

	@Override
	public long getClassTypeId() {
		return 0;
	}

	@Override
	public String getDescription(Locale locale) {
		return null;
	}

	@Override
	public Document getDisplayObject() {
		return null;
	}

	@Override
	public long getGroupId() {
		return 0;
	}

	@Override
	public String getKeywords(Locale locale) {
		return null;
	}

	@Override
	public String getTitle(Locale locale) {
		return null;
	}

	@Override
	public String getURLTitle(Locale locale) {
		return null;
	}

	public String getUID() {
		return _document.getUID();
	}

	@Reference(
		cardinality = ReferenceCardinality.MULTIPLE,
		policy = ReferencePolicy.DYNAMIC
	)
	protected void addSearchResultImageContributor(
		SearchResultImageContributor searchResultImageContributor) {

		_searchResultImageContributors.add(searchResultImageContributor);
	}

	/**
	 * This method currently doesn't work since @Reference values are null.
	 */
	protected SearchResultSummaryDisplayContext doBuildSummary(
			Document document,
			DocumentInfoListProviderContext documentInfoListProviderContext)
		throws Exception {

		SearchResultSummaryDisplayBuilder searchResultSummaryDisplayBuilder =
			new SearchResultSummaryDisplayBuilder();

		RenderRequest renderRequest =
			documentInfoListProviderContext.getRenderRequest();
		RenderResponse renderResponse =
			documentInfoListProviderContext.getRenderResponse();
		PortletURLFactory portletURLFactory =
			documentInfoListProviderContext.getPortletURLFactory();
		SearchResultsPortletPreferences searchResultsPortletPreferences =
			documentInfoListProviderContext.
				getSearchResultsPortletPreferences();
		SearchResultPreferences searchResultPreferences =
			documentInfoListProviderContext.getSearchResultPreferences();
		ThemeDisplay themeDisplay =
			documentInfoListProviderContext.getThemeDisplay();

		searchResultSummaryDisplayBuilder.setAssetEntryLocalService(
			assetEntryLocalService
		).setAssetRendererFactoryLookup(
			assetRendererFactoryLookup
		).setCurrentURL(
			_portal.getCurrentURL(renderRequest)
		).setDocument(
			document
		).setDocumentBuilderFactory(
			documentBuilderFactory
		).setFastDateFormatFactory(
			fastDateFormatFactory
		).setGroupLocalService(
			groupLocalService
		).setHighlightEnabled(
			searchResultsPortletPreferences.isHighlightEnabled()
		).setImageRequested(
			true
		).setIndexerRegistry(
			indexerRegistry
		).setLanguage(
			language
		).setLocale(
			themeDisplay.getLocale()
		).setPortletURLFactory(
			portletURLFactory
		).setRenderRequest(
			renderRequest
		).setRenderResponse(
			renderResponse
		).setRequest(
			getHttpServletRequest(renderRequest)
		).setResourceActions(
			resourceActions
		).setSearchResultImageContributorsStream(
			_searchResultImageContributors.stream()
		).setSearchResultPreferences(
			searchResultPreferences
		).setSummaryBuilderFactory(
			summaryBuilderFactory
		).setThemeDisplay(
			themeDisplay
		);

		return searchResultSummaryDisplayBuilder.build();
	}

	protected HttpServletRequest getHttpServletRequest(
		RenderRequest renderRequest) {

		LiferayPortletRequest liferayPortletRequest =
			_portal.getLiferayPortletRequest(renderRequest);

		return liferayPortletRequest.getHttpServletRequest();
	}

	@Reference
	protected AssetEntryLocalService assetEntryLocalService;

	protected AssetRendererFactoryLookup assetRendererFactoryLookup;

	@Reference
	protected DocumentBuilderFactory documentBuilderFactory;

	@Reference
	protected FastDateFormatFactory fastDateFormatFactory;

	@Reference
	protected GroupLocalService groupLocalService;

	@Reference
	protected Http http;

	@Reference
	protected IndexerRegistry indexerRegistry;

	@Reference
	protected InfoItemRendererTracker infoItemRendererTracker;

	@Reference
	protected InfoListProviderTracker infoListProviderTracker;

	@Reference
	protected Language language;

	@Reference
	protected PortletSharedRequestHelper portletSharedRequestHelper;

	@Reference
	protected PortletSharedSearchRequest portletSharedSearchRequest;

	@Reference
	protected ResourceActions resourceActions;

	@Reference
	protected SummaryBuilderFactory summaryBuilderFactory;

	private final Document _document;

	@Reference
	private Portal _portal;

	private final Set<SearchResultImageContributor>
		_searchResultImageContributors = new HashSet<>();
	private SearchResultSummaryDisplayContext
		_searchResultSummaryDisplayContext;

}