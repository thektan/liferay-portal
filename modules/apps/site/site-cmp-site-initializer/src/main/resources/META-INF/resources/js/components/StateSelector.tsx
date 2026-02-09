/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Option, Picker} from '@clayui/core';
import Label from '@clayui/label';
import {InternalDispatch, useControlledState} from '@clayui/shared';
import classNames from 'classnames';
import {ReactFieldBase as FieldBase} from 'dynamic-data-mapping-form-field-type/api';
import React, {LegacyRef, useMemo} from 'react';

import './StateSelector.scss';

export interface State {
	key: string;
	name: string;
	nextStates: string[];
}

declare type LabelDisplayType =
	| 'secondary'
	| 'info'
	| 'warning'
	| 'danger'
	| 'success'
	| 'unstyled';

const mapLabelToLabelDisplayType: {[key: string]: LabelDisplayType} = {
	'Blocked': 'danger',
	'Done': 'success',
	'In Progress': 'info',
	'Not Started': 'secondary',
	'Overdue': 'warning',
};

const mapKeyToDisplayOrder: Record<string, number> = {
	blocked: 3,
	done: 4,
	inProgress: 2,
	notStarted: 1,
};

const Trigger = React.forwardRef(
	(
		{
			children,
			className,
			disabled,
			onClick,
			onKeyDown,
			...otherProps
		}: {
			children: string;
			className?: string;
			disabled: boolean;
			onClick?: (event: React.MouseEvent) => void;
			onKeyDown?: (event: React.KeyboardEvent) => void;
			otherProps: unknown;
		},
		ref: LegacyRef<HTMLDivElement>
	) => {
		const eventHandlers = disabled
			? {
					onClick: (event: React.MouseEvent) =>
						event.preventDefault(),
					onKeyDown: (event: React.KeyboardEvent) =>
						event.preventDefault(),
				}
			: {onClick, onKeyDown};

		return (
			<div
				{...otherProps}
				{...eventHandlers}
				className={classNames(
					'lfr-cmp__state-selector',
					{disabled},
					className
				)}
				ref={ref}
				tabIndex={0}
			>
				<Label displayType={mapLabelToLabelDisplayType[children]}>
					{children}
				</Label>
			</div>
		);
	}
);

export default function StateSelector({
	disabled,
	initialSelectedKey,
	onChange,
	selectedKey: externalSelectedKey,
	showLabel = false,
	states,
}: {
	disabled?: boolean;
	initialSelectedKey?: string;
	onChange?: InternalDispatch<string>;
	selectedKey?: string;
	showLabel?: boolean;
	states: State[];
}) {
	const [selectedKey, setSelectedKey] = useControlledState({
		defaultName: 'initialSelectedKey',
		defaultValue: initialSelectedKey,
		handleName: 'onChange',
		name: 'selectedKey',
		onChange,
		value: externalSelectedKey,
	});

	/**
	 * If `initialSelectedKey` is defined, its value will always be used to
	 * determine the filteredStates (the available items in the dropdown).
	 * Otherwise, the current `selectedKey` will be used to determine the
	 * available items in the dropdown.
	 */
	const filteredStates = useMemo(() => {
		const baseStateKey = initialSelectedKey
			? initialSelectedKey
			: selectedKey;

		const currentState = states.find(({key}) => key === baseStateKey);

		if (!currentState) {
			return [];
		}

		return states
			.filter(
				({key}) =>
					currentState.nextStates.includes(key) ||
					key === baseStateKey
			)
			.sort(
				(a, b) =>
					(mapKeyToDisplayOrder[a.key] || 0) -
					(mapKeyToDisplayOrder[b.key] || 0)
			);
	}, [initialSelectedKey, selectedKey, states]);

	const handleSelectionChange = (value: React.Key) => {
		setSelectedKey(String(value));
	};

	return (
		<FieldBase
			accessible={false}
			hideEditedFlag
			label={Liferay.Language.get('state')}
			name="ObjectField_state"
			showLabel={showLabel}
			visible
		>
			<Picker<State>
				as={Trigger}
				defaultSelectedKey={initialSelectedKey}
				disabled={disabled}
				items={filteredStates}
				messages={{
					itemDescribedby: Liferay.Language.get(
						'you-are-currently-on-a-text-element,-inside-of-a-list-box'
					),
					itemSelected: Liferay.Language.get('x-selected'),
					scrollToBottomAriaLabel:
						Liferay.Language.get('scroll-to-bottom'),
					scrollToTopAriaLabel: Liferay.Language.get('scroll-to-top'),
				}}
				onSelectionChange={handleSelectionChange}
				selectedKey={selectedKey}
				width={125}
			>
				{(item) => (
					<Option key={item.key} textValue={item.name}>
						<Label
							displayType={mapLabelToLabelDisplayType[item.name]}
						>
							{item.name}
						</Label>
					</Option>
				)}
			</Picker>

			<input name="ObjectField_state" type="hidden" value={selectedKey} />
		</FieldBase>
	);
}
