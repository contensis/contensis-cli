import * as Actions from '../actions';

export default function loadingEntriesReducer(state = false, action) {
	switch (action.type) {
		case Actions.INITIALISE:
		case Actions.SEARCH_ENTRIES:
			return true;
		case Actions.INITIALISE_COMPLETE:
		case Actions.INITIALISE_ERROR:
		case Actions.SEARCH_ENTRIES_COMPLETE:
		case Actions.SEARCH_ENTRIES_ERROR:
			return false;
	}
	return state;
}
