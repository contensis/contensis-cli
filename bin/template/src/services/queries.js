import { Op } from './client';

export function versionStatus(versionStatus) {
	return [
		Op.equalTo('sys.versionStatus', versionStatus)
	];
}

export function includeInSearch() {
	return [
		Op.or(
			Op.and(Op.exists('includeInSearch', true), Op.equalTo('includeInSearch', true)),
			Op.exists('includeInSearch', false)
		)
	];
}

export function contentType(contentTypeId) {
	return [
		Op.equalTo('sys.contentTypeId', contentTypeId)
	]
}

export function searchTerm(term) {
	if (term) {
		return [Op.freeText('entryTitle', term)];
	}
	return [];
}

export function filters(search, getKey) {
	let result = [];
	// let filterQueries = Object.keys(search)
	// 	.filter(key => key.startsWith('filters.'))
	// 	.map(key => ({ field: key.substr(8), id: search[key] }))
	// 	.filter(({ field, id }) => !!key && !!id)
	// 	.map(({ field, id }) => ({ field, id, key: getKey(id) }))

	return result;
}
