import * as Actions from '../actions';

export default function searchReducer(state = {}, action) {
	switch (action.type) {
		case Actions.RESET_SEARCH:
			return { ...action.search };
		case Actions.SET_SEARCH_TERM:
			return { ...state, term: action.term };
		default:
			return state;
	}
	return state;
}