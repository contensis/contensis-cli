import React from 'react';
import { addFilter } from '../../services/navigation';

function FilterItem({ search, filter, node }) {

	const change = e => {
		addFilter(search, filter, e.target.value, e.target.checked);
	};

	const isChecked = (key) => {
		let value = search[`filters.${filter}`];
		return !!(value && (Array.isArray(value) ? (value.indexOf(key) >= 0) : (value === key)));
	};

	return (
		<fieldset>
			<legend>{node.name}</legend>
			<div>
				{(node.children || []).map(child => (
					<div key={child.key}>
						<input type="checkbox" id={child.key} value={child.id} defaultChecked={isChecked(child.id)} onChange={change} />
						<label htmlFor={child.key}><span></span> {child.name}</label>
					</div>
				))}
			</div>
			{JSON.stringify(search)}
		</fieldset>
	);
}

export default FilterItem;