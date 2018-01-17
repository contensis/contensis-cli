import { getEntries } from '../api';

export const RESET_SEARCH = 'RESET_SEARCH';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SEARCH_ENTRIES = 'SEARCH_ENTRIES';
export const SEARCH_ENTRIES_COMPLETE = 'SEARCH_ENTRIES_COMPLETE';
export const SEARCH_ENTRIES_ERROR = 'SEARCH_ENTRIES_ERROR';

export function searchEntries(search) {
	return async(dispatch, getState) => {
		dispatch({
			type: SEARCH_ENTRIES
		});
		try {
			let entries = await getEntries(search);
			dispatch({
				type: RESET_SEARCH,
				search
			});
			dispatch(searchEntriesComplete(entries));
		} catch (e) {
			console.log(e);
			dispatch(searchEntriesError(e));
		}
	};
}

export function searchEntriesComplete(entries) {
	return {
		type: SEARCH_ENTRIES_COMPLETE,
		entries
	};
}

export function searchEntriesError(error) {
	return {
		type: SEARCH_ENTRIES_ERROR,
		error
	};
}

export function setSearchTerm(term) {
	return {
		type: SET_SEARCH_TERM,
		term,
	};
}