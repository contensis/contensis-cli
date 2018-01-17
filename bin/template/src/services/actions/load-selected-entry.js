import { getEntry } from '../api';

export const LOAD_SELECTED_ENTRY = 'LOAD_SELECTED_ENTRY';
export const LOAD_SELECTED_ENTRY_COMPLETE = 'LOAD_SELECTED_ENTRY_COMPLETE';
export const LOAD_SELECTED_ENTRY_ERROR = 'LOAD_SELECTED_ENTRY_ERROR';

export function loadSelectedEntry(id) {
	return async(dispatch, getState) => {
		dispatch({
			type: LOAD_SELECTED_ENTRY,
			id
		});
		try {
			let entry = await getEntry(id);
			dispatch(loadSelectedEntryComplete(entry));
		} catch (e) {
			console.log(e);
			dispatch(loadSelectedEntryError(e));
		}
	};
}

export function loadSelectedEntryComplete(selectedEntry) {
	return {
		type: LOAD_SELECTED_ENTRY_COMPLETE,
		selectedEntry
	};
}

export function loadSelectedEntryError(error) {
	return {
		type: LOAD_SELECTED_ENTRY_ERROR,
		error
	};
}
