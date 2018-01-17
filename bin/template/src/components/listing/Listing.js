import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

function Listing({ entries }) {
	return (
		<ul>
			{entries.map(entry => (<ListItem entry={entry} key={entry.sys.id} />))}
		</ul>
	);
}

Listing.propTypes = {
	entries: PropTypes.array,
};

export default Listing;
