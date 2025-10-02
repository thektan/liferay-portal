/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayAlert from '@clayui/alert';
import ClayDatePicker from '@clayui/date-picker';
import ClayForm, {ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import {datetimeUtils} from '@liferay/object-js-components-web';
import classNames from 'classnames';
import {dateUtils, sub} from 'frontend-js-web';
import React, {useEffect} from 'react';

export default function ScheduleOptions({
	displayDate,
	error,
	formId,
	portletNamespace,
	setDisplayDate,
	setError,
	timeZone,
}) {
	const {day, hour, minutes, month, year} = getDate(displayDate);

	const dateConfig = datetimeUtils.generateDateConfigurations({
		defaultLanguageId: Liferay.ThemeDisplay.getDefaultLanguageId(),
		locale: Liferay.ThemeDisplay.getLanguageId(),
		type: 'DateTime',
	});

	useEffect(() => {
		if (displayDate) {
			if (displayDate.length !== 16 || !dateUtils.isValid(displayDate)) {
				setError(Liferay.Language.get('please-enter-a-valid-date'));

				return;
			}
			else {
				setError('');
			}
		}
	}, [displayDate, setError, timeZone]);

	return (
		<>
			<ClayForm.Group
				className={classNames('mb-0', {'has-error': error})}
			>
				<label htmlFor={`${portletNamespace}displayDatePicker`}>
					{Liferay.Language.get('date-and-time')}

					<ClayIcon
						className="ml-1 reference-mark"
						focusable="false"
						role="presentation"
						symbol="asterisk"
					/>
				</label>

				<ClayDatePicker
					ariaLabels={{
						buttonChooseDate: `${Liferay.Language.get(
							'select-date'
						)}`,
						buttonDot: `${Liferay.Language.get(
							'select-current-date'
						)}`,
						buttonNextMonth: `${Liferay.Language.get(
							'select-next-month'
						)}`,
						buttonPreviousMonth: `${Liferay.Language.get(
							'select-previous-month'
						)}`,
						dialog: `${Liferay.Language.get('select-date')}`,
						selectMonth: `${Liferay.Language.get('select-a-month')}`,
						selectYear: `${Liferay.Language.get('select-a-year')}`,
					}}
					dateFormat={dateConfig.dateFormat}
					firstDayOfWeek={dateUtils.getFirstDayOfWeek()}
					id={`${portletNamespace}displayDatePicker`}
					months={dateUtils.getMonthsLong()}
					onChange={setDisplayDate}
					placeholder={dateConfig.placeholder}
					required
					time
					timezone={timeZone.name}
					use12Hours={dateConfig.use12Hours}
					value={displayDate || ''}
					weekdaysShort={dateUtils.getWeekdaysShort()}
					years={{
						end: 9999,
						start: new Date().getFullYear(),
					}}
				/>

				{error ? (
					<div className="error-container mt-1">
						<ClayAlert
							className="mt-1"
							displayType="danger"
							title={Liferay.Language.get('error-colon') + ' '}
							variant="feedback"
						>
							{error}
						</ClayAlert>
					</div>
				) : null}
			</ClayForm.Group>

			<p className="mt-1 text-3 text-secondary">
				{sub(Liferay.Language.get('time-zone-x'), timeZone.name)}
			</p>

			<ClayInput
				form={formId}
				name={`${portletNamespace}displayDateDay`}
				type="hidden"
				value={day}
			/>

			<ClayInput
				form={formId}
				name={`${portletNamespace}displayDateHour`}
				type="hidden"
				value={hour}
			/>

			<ClayInput
				form={formId}
				name={`${portletNamespace}displayDateMinute`}
				type="hidden"
				value={minutes}
			/>

			<ClayInput
				form={formId}
				name={`${portletNamespace}displayDateMonth`}
				type="hidden"
				value={month}
			/>

			<ClayInput
				form={formId}
				name={`${portletNamespace}displayDateYear`}
				type="hidden"
				value={year}
			/>
		</>
	);
}

function getDate(value) {
	const date = new Date(value);

	if (dateUtils.isValid(date)) {
		return {
			day: date.getDate(),
			hour: date.getHours(),
			minutes: date.getMinutes(),
			month: date.getMonth(),
			year: date.getFullYear(),
		};
	}

	return {day: '', hour: '', minutes: '', month: '', year: ''};
}
