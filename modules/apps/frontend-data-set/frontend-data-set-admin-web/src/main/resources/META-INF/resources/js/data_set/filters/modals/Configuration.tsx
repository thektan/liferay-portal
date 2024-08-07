/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Option, Picker} from '@clayui/core';
import ClayForm from '@clayui/form';
import ClayLabel from '@clayui/label';
import ClayLayout from '@clayui/layout';
import classNames from 'classnames';
import {InputLocalized} from 'frontend-js-components-web';
import React, {useState} from 'react';

import RequiredMark from '../../../components/RequiredMark';
import ValidationFeedback from '../../../components/ValidationFeedback';
import {IField, IFilter} from '../../../utils/types';

interface IConfigurationProps {
	fieldInUseValidationError: boolean;
	fieldNames?: string[];
	fieldValidationError: boolean;
	fields: IField[];
	filter?: IFilter;
	labelValidationError?: boolean;
	namespace: string;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	onChangeField: (selectedField: IField | undefined) => void;
	onChangeLabel: (
		i18nFilterLabels: Partial<Liferay.Language.FullyLocalizedValue<string>>
	) => void;
}

function Configuration({
	fieldInUseValidationError,
	fieldNames,
	fieldValidationError,
	fields,
	filter,
	labelValidationError,
	namespace,
	onBlur,
	onChangeField,
	onChangeLabel,
}: IConfigurationProps) {
	const [selectedField, setSelectedField] = useState<IField | undefined>(
		fields.find((item) => item.name === filter?.fieldName)
	);
	const fdsFilterLabelTranslations = filter?.label_i18n ?? {};

	const [i18nFilterLabels, setI18nFilterLabels] = useState(
		fdsFilterLabelTranslations
	);

	const inUseFields: (string | undefined)[] = fields.map((item) =>
		fieldNames?.includes(item.name) ? item.name : undefined
	);
	const nameFormElementId = `${namespace}Name`;
	const selectedFieldFormElementId = `${namespace}SelectedField`;

	return (
		<>
			<ClayLayout.SheetSection className="mb-4">
				<h3 className="sheet-subtitle">
					{Liferay.Language.get('configuration')}
				</h3>

				<ClayForm.Text>
					{Liferay.Language.get(
						'add-a-name-for-your-filter-and-select-a-field-to-start-creating-it'
					)}
				</ClayForm.Text>
			</ClayLayout.SheetSection>

			<ClayForm.Group
				className={classNames({
					'has-error': labelValidationError,
				})}
			>
				<InputLocalized
					id={nameFormElementId}
					label={Liferay.Language.get('name')}
					name="label"
					onBlur={onBlur}
					onChange={(values) => {
						onChangeLabel(values);
						setI18nFilterLabels(values);
					}}
					placeholder={Liferay.Language.get('add-a-name')}
					required={true}
					translations={i18nFilterLabels}
				/>

				{labelValidationError && <ValidationFeedback />}
			</ClayForm.Group>

			<ClayForm.Group
				className={classNames({
					'has-error':
						fieldInUseValidationError || fieldValidationError,
				})}
			>
				<label htmlFor={selectedFieldFormElementId}>
					{Liferay.Language.get('filter-by')}

					<RequiredMark />
				</label>

				<Picker
					disabled={!!filter}
					items={fields}
					onSelectionChange={(label: React.Key) => {
						const newVal = fields.find((field) => {
							return field.label === label;
						});

						if (newVal) {
							setSelectedField(newVal);

							onChangeField(newVal);
						}
					}}
					selectedKey={selectedField ? selectedField.label : ''}
				>
					{(item) => (
						<Option key={item.label} textValue={item.label}>
							<ClayLayout.ContentRow>
								<ClayLayout.ContentCol expand>
									{item.label}
								</ClayLayout.ContentCol>

								{inUseFields.includes(item.name) && (
									<ClayLayout.ContentCol>
										<ClayLabel displayType="info">
											{Liferay.Language.get('in-use')}
										</ClayLabel>
									</ClayLayout.ContentCol>
								)}
							</ClayLayout.ContentRow>
						</Option>
					)}
				</Picker>

				{fieldInUseValidationError && (
					<ValidationFeedback
						message={Liferay.Language.get(
							'this-field-is-being-used-by-another-filter'
						)}
					/>
				)}

				{fieldValidationError && <ValidationFeedback />}
			</ClayForm.Group>
		</>
	);
}

export default Configuration;
