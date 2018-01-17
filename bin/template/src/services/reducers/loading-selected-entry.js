import * as Actions from '../actions';

export default function loadingSelectedEntryReducer(state = false, action) {
	switch (action.type) {
		case Actions.LOAD_SELECTED_ENTRY:
			return true;
		case Actions.LOAD_SELECTED_ENTRY_COMPLETE:
		case Actions.LOAD_SELECTED_ENTRY_ERROR:
			return false;
	}
	return state;
}
