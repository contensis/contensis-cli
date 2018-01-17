import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSelectedEntry } from '../services/selectors';

function <%= contentTypeName %>Record({ entry }) {
	return (
		<div>
			{entry && <h1>{entry.entryTitle}</h1>}
			<% for(var i=0; i < contentType.fields.length; i++) { %>
			{entry && entry.<%= contentType.fields[i].id %> && <h2><%= contentType.fields[i].name['en-GB'] %></h2>}
			{entry && entry.<%= contentType.fields[i].id %> && <%- renderField(contentType.fields[i]) %>}			
			<% } %>
			<p><a href="#/">Back to List</a></p>
		</div>
	);
}

<%= contentTypeName %>Record.propTypes = {
	entry: PropTypes.object,
};

const mapStateToProps = state => ({ entry: getSelectedEntry(state) });

export default connect(mapStateToProps)(<%= contentTypeName %>Record);