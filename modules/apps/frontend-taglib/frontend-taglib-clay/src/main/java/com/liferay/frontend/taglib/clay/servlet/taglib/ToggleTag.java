/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.frontend.taglib.clay.servlet.taglib;

import com.liferay.frontend.taglib.clay.internal.servlet.taglib.BaseContainerTag;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.Validator;

import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

/**
 * @author Kevin Tan
 */
public class ToggleTag extends BaseContainerTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public boolean getDisabled() {
		return _disabled;
	}

	public String getHelpText() {
		return _helpText;
	}

	public String getId() {
		return _id;
	}

	public String getLabel() {
		return _label;
	}

	public String getLabelOff() {
		return _labelOff;
	}

	public String getLabelOn() {
		return _labelOn;
	}

	public String getName() {
		return _name;
	}

	public String getRole() {
		return _role;
	}

	public String getSymbolOff() {
		return _symbolOff;
	}

	public String getSymbolOn() {
		return _symbolOn;
	}

	public boolean getToggled() {
		return _toggled;
	}

	public String getValue() {
		return _value;
	}

	public void setDisabled(boolean disabled) {
		_disabled = disabled;
	}

	public void setHelpText(String helpText) {
		_helpText = helpText;
	}

	public void setId(String id) {
		_id = id;
	}

	public void setLabel(String label) {
		_label = label;
	}

	public void setLabelOff(String labelOff) {
		_labelOff = labelOff;
	}

	public void setLabelOn(String labelOn) {
		_labelOn = labelOn;
	}

	public void setName(String name) {
		_name = name;
	}

	public void setRole(String role) {
		_role = role;
	}

	public void setSymbolOff(String symbolOff) {
		_symbolOff = symbolOff;
	}

	public void setSymbolOn(String symbolOn) {
		_symbolOn = symbolOn;
	}

	public void setToggled(boolean toggled) {
		_toggled = toggled;
	}

	public void setValue(String value) {
		_value = value;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_disabled = false;
		_helpText = null;
		_id = null;
		_label = null;
		_labelOff = null;
		_labelOn = null;
		_name = null;
		_role = null;
		_symbolOff = null;
		_symbolOn = null;
		_toggled = false;
		_type = null;
		_value = null;
	}

	@Override
	protected String getHydratedModuleName() {
		return "{Toggle} from frontend-taglib-clay";
	}

	@Override
	protected Map<String, Object> prepareProps(Map<String, Object> props) {
		props.put("disabled", _disabled);
		props.put("helpText", _helpText);
		props.put("id", _id);
		props.put("label", _label);
		props.put("labelOff", _labelOff);
		props.put("labelOn", _labelOn);
		props.put("name", _name);

		if (Validator.isNotNull(_role)) {
			props.put("role", _role);
		}

		props.put("toggled", _toggled);

		if (Validator.isNotNull(_type)) {
			props.put("type", _type);
		}

		props.put("value", _value);

		if (Validator.isNotNull(_symbolOff) || Validator.isNotNull(_symbolOn)) {
			JSONObject symbolJSONObject = JSONFactoryUtil.createJSONObject();

			if (Validator.isNotNull(_symbolOff)) {
				symbolJSONObject.put("off", _symbolOff);
			}

			if (Validator.isNotNull(_symbolOn)) {
				symbolJSONObject.put("on", _symbolOn);
			}

			props.put("symbol", symbolJSONObject);
		}

		return super.prepareProps(props);
	}

	@Override
	protected int processStartTag() throws Exception {
		super.processStartTag();

		JspWriter jspWriter = pageContext.getOut();

		jspWriter.write("<label class=\"toggle-switch\">");
		jspWriter.write("<span class=\"toggle-switch-check-bar\">");

		jspWriter.write("<input class=\"toggle-switch-check\"");

		if (_toggled) {
			jspWriter.write(" checked");
		}

		if (_disabled) {
			jspWriter.write(" disabled");
		}

		if (Validator.isNotNull(_id)) {
			jspWriter.write(" id=\"");
			jspWriter.write(_id);
			jspWriter.write("\"");
		}

		if (Validator.isNotNull(_name)) {
			jspWriter.write(" name=\"");
			jspWriter.write(_name);
			jspWriter.write("\"");
		}

		if (Validator.isNotNull(_type)) {
			jspWriter.write(" type=\"");
			jspWriter.write(_type);
			jspWriter.write("\"");
		}

		jspWriter.write(" role=\"");
		jspWriter.write(_role);
		jspWriter.write("\"");

		jspWriter.write(" role=\"radio\" type=\"radio\"");

		if (Validator.isNotNull(_value)) {
			jspWriter.write(" value=\"");
			jspWriter.write(_value);
			jspWriter.write("\"");
		}

		jspWriter.write("/>");

		jspWriter.write(
			"<span aria-hidden=\"true\" class=\"toggle-switch-bar\">");
		jspWriter.write("<span class=\"toggle-switch-handle\"></span>");
		jspWriter.write("</span>");

		if (Validator.isNotNull(_label) || Validator.isNotNull(_labelOff) ||
			Validator.isNotNull(_labelOn)) {

			jspWriter.write("<span class=\"toggle-switch-label\">");

			if (Validator.isNotNull(_labelOff) && !_toggled) {
				jspWriter.write(_labelOff);
			}
			else if (Validator.isNotNull(_labelOn) && _toggled) {
				jspWriter.write(_labelOn);
			}
			else if (Validator.isNotNull(_label)) {
				jspWriter.write(_label);
			}

			jspWriter.write("</span>");
		}

		jspWriter.write("</label>");

		return SKIP_BODY;
	}

	private static final String _ATTRIBUTE_NAMESPACE = "clay:toggle:";

	private boolean _disabled;
	private String _helpText;
	private String _id;
	private String _label;
	private String _labelOff;
	private String _labelOn;
	private String _name;
	private String _role;
	private String _symbolOff;
	private String _symbolOn;
	private boolean _toggled;
	private String _type;
	private String _value;

}