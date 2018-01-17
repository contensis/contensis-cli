import * as Actions from '../actions';

export default function filtersReducer(state = {}, action) {
	switch (action.type) {
		case Actions.LOAD_FILTERS_COMPLETE:
			return { ...action.filters };
		default:
			return state;
	}
}