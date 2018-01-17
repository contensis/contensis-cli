import router from '../routes/router';

export function navigate(lastSearch, newSearch) {
	const search = { ...lastSearch, ...newSearch };
	router.navigate('list', search);
}

export function toUrl(lastSearch, newSearch) {
	const search = { ...lastSearch, ...newSearch };
	return router.buildUrl('list', search);
}

export function addFilter(lastSearch, filterName, value, checked) {
	let name = `filters.${filterName}`;
	let currentFilter = (lastSearch || {})[name] || [];
	currentFilter = Array.isArray(currentFilter) ? currentFilter : [currentFilter];
	let index = currentFilter.indexOf(value);
	if (!checked && (index >= 0)) {
		currentFilter = currentFilter.filter(v => v !== value);
		navigate(lastSearch, { [name]: currentFilter, pageIndex: 0 });
	}
	if (checked && (index < 0)) {
		currentFilter = [...currentFilter, value];
		navigate(lastSearch, { [name]: currentFilter, pageIndex: 0 });
	}
}

