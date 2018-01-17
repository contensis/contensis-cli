import <%= contentTypeName %>Listing from '../components/<%= contentTypeName %>Listing';
import <%= contentTypeName %>Record from '../components/<%= contentTypeName %>Record';
import * as Actions from '../services/actions';

export default [
	{
		name: 'list',
		path: '/',
		component: <%= contentTypeName %>Listing,
		onActivate: (store, toState, fromState) => {
			const search = { ...toState.params };
			store.dispatch(Actions.initialiseFilters());
			return store.dispatch(Actions.searchEntries(search));
		}
	},
	{
		name: 'entry',
		path: '/:id',
		component: <%= contentTypeName %>Record,
		onActivate: (store, toState, fromState) => {
			return store.dispatch(Actions.loadSelectedEntry(toState.params.id));
		}
	}
];