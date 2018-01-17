import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBox from './listing/SearchBox';
import Filters from './listing/Filters';
import Listing from './listing/Listing';
import Pager from './listing/Pager';
import { getEntries, getSearch, getFilters } from '../services/selectors';


function <%= contentTypeName %>Listing({ entries, search, filters }) {
	const { items = [] } = entries || {};
	return (
		<div>	
			<SearchBox search={search} />
			<Filters search={search} filters={filters} />
			<Listing entries={items} />
			{entries && <Pager entries={entries} search={search} />}
		</div>
	);
}

<%= contentTypeName %>Listing.propTypes = {
	entries: PropTypes.object,
};

const mapStateToProps = state => ({ entries: getEntries(state), search: getSearch(state), filters: getFilters(state) });

export default connect(mapStateToProps)(<%= contentTypeName %>Listing);
