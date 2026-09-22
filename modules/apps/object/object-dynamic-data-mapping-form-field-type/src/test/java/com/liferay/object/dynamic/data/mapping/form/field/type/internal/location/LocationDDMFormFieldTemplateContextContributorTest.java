/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.object.dynamic.data.mapping.form.field.type.internal.location;

import com.liferay.dynamic.data.mapping.model.DDMFormField;
import com.liferay.dynamic.data.mapping.render.DDMFormFieldRenderingContext;
import com.liferay.dynamic.data.mapping.test.util.BaseDDMFormFieldTemplateContextContributorTestCase;
import com.liferay.map.constants.MapProviderWebKeys;
import com.liferay.object.dynamic.data.mapping.form.field.type.constants.ObjectDDMFormFieldTypeConstants;
import com.liferay.portal.kernel.model.Group;
import com.liferay.portal.kernel.service.GroupLocalService;
import com.liferay.portal.kernel.test.ReflectionTestUtil;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.PrefsPropsUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.test.rule.LiferayUnitTestRule;

import jakarta.portlet.PortletPreferences;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import org.mockito.MockedStatic;
import org.mockito.Mockito;

import org.springframework.mock.web.MockHttpServletRequest;

/**
 * @author Kevin Tan
 */
public class LocationDDMFormFieldTemplateContextContributorTest
	extends BaseDDMFormFieldTemplateContextContributorTestCase {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@AfterClass
	public static void tearDownClass() {
		_prefsPropsUtilMockedStatic.close();
	}

	@Before
	@Override
	public void setUp() throws Exception {
		super.setUp();

		_ddmFormField.setDDMForm(getDDMForm());

		Mockito.when(
			_group.getGroupId()
		).thenReturn(
			_GROUP_ID
		);

		Mockito.when(
			_groupLocalService.fetchGroup(_GROUP_ID)
		).thenReturn(
			_group
		);

		ReflectionTestUtil.setFieldValue(
			_locationDDMFormFieldTemplateContextContributor,
			"_groupLocalService", _groupLocalService);

		_prefsPropsUtilMockedStatic.when(
			() -> PrefsPropsUtil.getPreferences(_COMPANY_ID)
		).thenReturn(
			_companyPortletPreferences
		);
	}

	@Test
	public void testGetParametersDefaultsToOpenStreetMap() {
		Map<String, Object> parameters =
			_locationDDMFormFieldTemplateContextContributor.getParameters(
				_ddmFormField, _createDDMFormFieldRenderingContext(false));

		Assert.assertNull(parameters.get("googleMapsAPIKey"));
		Assert.assertEquals(
			"OpenStreetMap", MapUtil.getString(parameters, "mapProviderKey"));
	}

	@Test
	public void testGetParametersFromCompanyPreferences() {
		Mockito.when(
			_group.isControlPanel()
		).thenReturn(
			true
		);

		_mockCompanyPortletPreferences("companyKey", "GoogleMaps");

		Map<String, Object> parameters =
			_locationDDMFormFieldTemplateContextContributor.getParameters(
				_ddmFormField, _createDDMFormFieldRenderingContext(false));

		Assert.assertEquals(
			"companyKey", MapUtil.getString(parameters, "googleMapsAPIKey"));
		Assert.assertEquals(
			"GoogleMaps", MapUtil.getString(parameters, "mapProviderKey"));
	}

	@Test
	public void testGetParametersFromSiteSettings() {
		_mockCompanyPortletPreferences("companyKey", "OpenStreetMap");

		Mockito.when(
			_group.getTypeSettingsProperty("googleMapsAPIKey")
		).thenReturn(
			"siteKey"
		);

		Mockito.when(
			_group.getTypeSettingsProperty(MapProviderWebKeys.MAP_PROVIDER_KEY)
		).thenReturn(
			"GoogleMaps"
		);

		Map<String, Object> parameters =
			_locationDDMFormFieldTemplateContextContributor.getParameters(
				_ddmFormField, _createDDMFormFieldRenderingContext(false));

		Assert.assertEquals(
			"siteKey", MapUtil.getString(parameters, "googleMapsAPIKey"));
		Assert.assertEquals(
			"GoogleMaps", MapUtil.getString(parameters, "mapProviderKey"));
	}

	@Test
	public void testGetParametersWithoutThemeDisplay() {
		Map<String, Object> parameters =
			_locationDDMFormFieldTemplateContextContributor.getParameters(
				_ddmFormField, _createDDMFormFieldRenderingContext(true));

		Assert.assertNull(parameters.get("googleMapsAPIKey"));
		Assert.assertEquals(
			"OpenStreetMap", MapUtil.getString(parameters, "mapProviderKey"));
	}

	private DDMFormFieldRenderingContext _createDDMFormFieldRenderingContext(
		boolean withoutThemeDisplay) {

		DDMFormFieldRenderingContext ddmFormFieldRenderingContext =
			createDDMFormFieldRenderingContext();

		if (withoutThemeDisplay) {
			ddmFormFieldRenderingContext.setHttpServletRequest(
				new MockHttpServletRequest());

			return ddmFormFieldRenderingContext;
		}

		HttpServletRequest httpServletRequest =
			ddmFormFieldRenderingContext.getHttpServletRequest();

		ThemeDisplay themeDisplay =
			(ThemeDisplay)httpServletRequest.getAttribute(
				WebKeys.THEME_DISPLAY);

		Mockito.when(
			themeDisplay.getCompanyId()
		).thenReturn(
			_COMPANY_ID
		);

		Mockito.when(
			themeDisplay.getScopeGroup()
		).thenReturn(
			_group
		);

		Mockito.when(
			themeDisplay.getScopeGroupId()
		).thenReturn(
			_GROUP_ID
		);

		return ddmFormFieldRenderingContext;
	}

	private void _mockCompanyPortletPreferences(
		String googleMapsAPIKey, String mapProviderKey) {

		Mockito.when(
			_companyPortletPreferences.getValue("googleMapsAPIKey", null)
		).thenReturn(
			googleMapsAPIKey
		);

		Mockito.when(
			_companyPortletPreferences.getValue(
				MapProviderWebKeys.MAP_PROVIDER_KEY, null)
		).thenReturn(
			mapProviderKey
		);
	}

	private static final long _COMPANY_ID = RandomTestUtil.randomLong();

	private static final long _GROUP_ID = RandomTestUtil.randomLong();

	private static final MockedStatic<PrefsPropsUtil>
		_prefsPropsUtilMockedStatic = Mockito.mockStatic(PrefsPropsUtil.class);

	private final PortletPreferences _companyPortletPreferences = Mockito.mock(
		PortletPreferences.class);
	private final DDMFormField _ddmFormField = new DDMFormField(
		"field", ObjectDDMFormFieldTypeConstants.LOCATION);
	private final Group _group = Mockito.mock(Group.class);
	private final GroupLocalService _groupLocalService = Mockito.mock(
		GroupLocalService.class);
	private final LocationDDMFormFieldTemplateContextContributor
		_locationDDMFormFieldTemplateContextContributor =
			new LocationDDMFormFieldTemplateContextContributor();

}