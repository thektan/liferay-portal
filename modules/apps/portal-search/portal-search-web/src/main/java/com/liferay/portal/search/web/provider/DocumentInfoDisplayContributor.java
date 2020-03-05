package com.liferay.portal.search.web.provider;

import com.liferay.info.display.contributor.InfoDisplayContributor;
import com.liferay.info.display.contributor.InfoDisplayField;
import com.liferay.info.display.contributor.InfoDisplayObjectProvider;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.search.Document;

import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.osgi.service.component.annotations.Component;

/**
 * @author Kevin Tan
 */
@Component(service = InfoDisplayContributor.class)
public class DocumentInfoDisplayContributor
	implements InfoDisplayContributor<Document> {

	@Override
	public String getClassName() {
		return Document.class.getName();
	}

	@Override
	public Set<InfoDisplayField> getInfoDisplayFields(
			long classTypeId, Locale locale)
		throws PortalException {

		// TODO

		return null;
	}

	@Override
	public Map<String, Object> getInfoDisplayFieldsValues(
			Document document, Locale locale)
		throws PortalException {

		// TODO

		return null;
	}

	public InfoDisplayObjectProvider<Document> getInfoDisplayObjectProvider(
			Document document,
			DocumentInfoListProviderContext documentInfoListProviderContext)
		throws Exception {

		return new DocumentInfoDisplayObjectProvider(
			document, documentInfoListProviderContext);
	}

	@Override
	public InfoDisplayObjectProvider<Document> getInfoDisplayObjectProvider(
			long classPK)
		throws PortalException {

		// NOTE: Example from BlogsEntryInfoDisplayContributor.java

		//		BlogsEntry blogsEntry = _blogsEntryService.getEntry(classPK);
		//
		//		if (blogsEntry.isDraft() || blogsEntry.isInTrash()) {
		//			return null;
		//		}
		//
		//		return new BlogsEntryInfoDisplayObjectProvider(blogsEntry);

		return null;
	}

	@Override
	public InfoDisplayObjectProvider<Document> getInfoDisplayObjectProvider(
			long groupId, String urlTitle)
		throws PortalException {

		// TODO

		return null;
	}

	@Override
	public String getInfoURLSeparator() {

		// TODO

		return null;
	}

}