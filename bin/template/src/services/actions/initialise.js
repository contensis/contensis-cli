
export const INITIALISE = 'INITIALISE';
export const INITIALISE_COMPLETE = 'INITIALISE_COMPLETE';
export const INITIALISE_ERROR = 'INITIALISE_ERROR';

export function initialise() {
	return {
		type: INITIALISE
	}
}

export function initialiseComplete(initialData) {
	return {
		type: INITIALISE_COMPLETE,
		initialData
	}
}

export function initialiseError(error) {
	return {
		type: INITIALISE_ERROR,
		error
	}
}
