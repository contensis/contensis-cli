import { createStore, applyMiddleware, compose } from 'redux';
import { router5Middleware } from 'redux-router5';
import thunkMiddleware from 'redux-thunk';
import createReducer from './reducers';


export default function configureStore(router, initialState) {	
	const enhancers = [applyMiddleware(thunkMiddleware, router5Middleware(router))];
	const composeEnhancers =
    	process.env.NODE_ENV !== 'production' &&
    	typeof window === 'object' &&
    	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        	shouldHotReload: false,
      	})
	  	: compose;
	  
	const store = createStore(
		createReducer(),
		composeEnhancers(...enhancers)
	);

	router.setDependency('store', store);
	return store;
}
