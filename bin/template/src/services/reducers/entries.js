import * as Actions from '../actions';

export default function entriesReducer(state = null, action) {
	switch (action.type) {
		case Actions.INITIALISE_COMPLETE:
			return action.initialData.entries;
		case Actions.SEARCH_ENTRIES_COMPLETE:
			return action.entries;
	}
	return state;
}
