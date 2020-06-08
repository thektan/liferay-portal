/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import ClayForm from '@clayui/form';
import ClayMultiSelect from '@clayui/multi-select';
import React, {useEffect, useState} from 'react';

import {STORAGE, getStorageKey, useSessionStorage} from '../utils/storage';

function FacetInput({label, param, values = []}) {
	const [value, setValue] = useState('');
	const [items, setItems] = useState([]);

	return (
		<ClayForm.Group>
			<label>{label}</label>

			<ClayMultiSelect
				inputName={param}
				inputValue={value}
				items={items}
				onChange={setValue}
				onItemsChange={setItems}
				sourceItems={values}
			/>
		</ClayForm.Group>
	);
}

export default function ({searchKey}) {
	const [resultsStorageData] = useSessionStorage(
		getStorageKey(STORAGE.RESULTS, searchKey)
	);

	const [facets, setFacets] = useState([]);

	useEffect(() => {
		const {facets: storageDataFacets} = resultsStorageData || {};

		setFacets(storageDataFacets || []);
	}, [resultsStorageData]);

	return facets.map((facet) => <FacetInput key={facet.param} {...facet} />);
}
