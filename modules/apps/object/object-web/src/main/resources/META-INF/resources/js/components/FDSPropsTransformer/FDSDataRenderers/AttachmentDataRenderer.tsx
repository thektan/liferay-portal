/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayLink from '@clayui/link';
import React from 'react';

interface AttachmentDataRendererProps {
	value?: {
		link?: {
			href: string;
			label: string;
		};
		size?: string;
	};
}

/**
 * Renders the Attachment column of the entries table: the file name as a
 * download link with the formatted size under it. The size sits inside the
 * link so screen readers announce the name and size together.
 */
export default function AttachmentDataRenderer({
	value,
}: AttachmentDataRendererProps) {
	if (!value?.link) {
		return null;
	}

	return (
		<div className="table-list-title">
			<ClayLink href={value.link.href}>
				{value.link.label}

				{value.size && (
					<span className="d-block font-weight-normal small text-secondary">
						{value.size}
					</span>
				)}
			</ClayLink>
		</div>
	);
}
