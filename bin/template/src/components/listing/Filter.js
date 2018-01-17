import React from 'react';
import FilterItem from './FilterItem';
import { connect } from 'react-redux';
import * as Actions from '../../services/actions';

function Filters({ filters, search }) {
	return (
		<div>
			{filters && Object.keys(filters).map(key => <FilterItem key={key} node={filters[key]} search={search} filter={key} />)}
	   	</div>
	);
}

const mapDispatchToProps = dispatch => ({
	// toggleFilterList: () => {
	// 	dispatch(Actions.toggleFilterList());
	// } 
});

export default connect(null, mapDispatchToProps)(Filters);