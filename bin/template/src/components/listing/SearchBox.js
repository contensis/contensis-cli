import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../services/actions';
import { navigate } from '../../services/navigation';

function SearchBox({ search, setSearchTerm }) {
	let searchInput = null;

	const click = e => {
		e.preventDefault();
		e.stopPropagation();
		navigate(search, { term: searchInput.value, pageIndex: 0 });
	};

	const keyDown = e => {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const keyUp = e => {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			navigate(search, { term: searchInput.value, pageIndex: 0 });
		}
	};

	const setSearchInput = input => {
		searchInput = input;
		if (input && search && search.term) {
			input.value = search.term;
		}
	};

	return (
		<div>
			<label htmlFor="search_redirectTextBox">Search Now</label>
			<input onKeyDown={keyDown} onKeyUp={keyUp} type="text" placeholder="Search website" id="search_redirectTextBox" ref={setSearchInput} />
			<input type="submit" value="Search" onClick={click} />					
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	setSearchTerm: (term) => {
		dispatch(Actions.setSearchTerm(term));
	} 
});

export default connect(null, mapDispatchToProps)(SearchBox);
