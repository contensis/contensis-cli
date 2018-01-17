import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5'
import entriesReducer from './entries';
import loadingEntriesReducer from './loading-entries';
import selectedEntryReducer from './selected-entry';
import loadingSelectedEntryReducer from './loading-selected-entry';
import searchReducer from './search';
import filtersReducer from './filters';

export default function createReducer() {
	return combineReducers({
		entries: entriesReducer,
		loadingEntries: loadingEntriesReducer,
		selectedEntry: selectedEntryReducer,
		loadingSelectedEntry: loadingSelectedEntryReducer,
		search: searchReducer,
		filters: filtersReducer,
		router: router5Reducer
	});
}
