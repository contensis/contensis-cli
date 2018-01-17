import { getFilters } from '../api';

export const LOAD_FILTERS_COMPLETE = 'LOAD_FILTERS_COMPLETE';
export const LOAD_FILTERS_ERROR = 'LOAD_FILTERS_ERROR';

export function initialiseFilters() {
	return async(dispatch, getState) => {				
		try {
			let filters = await getFilters();
			dispatch(loadFiltersComplete(filters));
		} catch (e) {
			console.log(e);
			dispatch(loadFiltersError(e));
		}				
	};
}

export function loadFiltersComplete(filters) {
	return {
		type: LOAD_FILTERS_COMPLETE,
		filters
	};
}

export function loadFiltersError(error) {
	return {
		type: LOAD_FILTERS_ERROR,
		error,
	};
}