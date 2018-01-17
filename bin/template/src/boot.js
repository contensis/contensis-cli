import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { getInitialData } from './services/api';
import * as Actions from './services/actions';
import configureStore from './services/store';
import router from './routes/router';
import RoutedApp from './routes/RoutedApp';

let store;

function App(props) {
	return (
		<Provider store={store}>
			<RouterProvider router={ router }>
				<RoutedApp />
			</RouterProvider> 
		</Provider>
	);
}

export function renderClient(id) {
	store = configureStore(router, null);
	store.dispatch(Actions.initialise());
	router.start(() => {
		ReactDOM.render(<App />, document.getElementById(id));
	});
}

export function hydrateClient(id) {
	store = configureStore(router, null);
	store.dispatch(Actions.initialise());
	router.start(() => {
		ReactDOM.hydrate(<App />, document.getElementById(id));
	});
}

export async function renderServer(id) {
	let initialData = await getInitialData();
	store = configureStore(router, initialData);
	router.start(() => {
		ReactDOM.render(<App />, document.getElementById(id));
	});	
}
