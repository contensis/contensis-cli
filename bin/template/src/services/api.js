import { CONTENT_TYPE_ID } from '../config';
import { client, cachedSearch, Query, versionStatus } from './client';
import * as queries from './queries';

export async function getInitialData() {
	let entries = await getEntries();
	return {
		entries
	};
}

export async function getEntries(search = {}) {
	let expressions = [
		...queries.versionStatus(versionStatus),
		...queries.includeInSearch(),
		...queries.contentType(CONTENT_TYPE_ID),
		...queries.searchTerm(search.term),
		...queries.filters(search)
	];
	const query = new Query(...expressions);
	query.pageIndex = search.pageIndex || 0;
	let entries = await cachedSearch.search(query);
	return entries;
}

export async function getEntry(id) {
	let entry = await client.entries.get(id);
	return entry;
}

export async function getFilters(type) {
	let contentType = await cachedSearch.getContentType(CONTENT_TYPE_ID);
	let taxonomyFields = contentType.fields.filter(field => field.dataFormat === 'taxonomy');
	let taxonomyPromises = taxonomyFields.map(field => {
		let taxonomyKey = (field && field.validations && field.validations.taxonomyRoot && field.validations.taxonomyRoot.key);
		return !!taxonomyKey ?
			cachedSearch.getTaxonomyNode(taxonomyKey).then(node => ({
				[field.id]: node
			})) :
			null;
	});
	let filters = await Promise.all(taxonomyPromises);
	return filters.reduce((result, filter) => ({ ...result,
		...filter
	}), {});
}