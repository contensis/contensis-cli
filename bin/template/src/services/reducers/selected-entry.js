import * as Actions from '../actions';

export default function selectedEntryReducer(state = null, action) {
	switch (action.type) {
		case Actions.LOAD_SELECTED_ENTRY_COMPLETE:
			return action.selectedEntry;
	}
	return state;
}
