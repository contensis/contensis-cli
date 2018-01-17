import React from 'react';
import PropTypes from 'prop-types';

function ListItem({ entry }) {
	return (
		<li><a href={`#/${entry.sys.id}`}>{entry.entryTitle}</a></li>
	);
}

ListItem.propTypes = {
	entry: PropTypes.object,
};

export default ListItem;
