import createRouter from 'router5'
import listenersPlugin from 'router5/plugins/listeners'
import browserPlugin from 'router5/plugins/browser'
import routes from './routes';

const router = createRouter(routes, {
		defaultRoute: 'list'
	})
	.usePlugin(listenersPlugin())
	.usePlugin(browserPlugin({
		useHash: true
	}));

function OnActivateMiddlewareFactory(routes) {
	return (router, dependencies) => {
		return (toState, fromState) => {
			let toRoute = routes.find(r => r.name === toState.name);
			if (!toRoute || !toRoute.onActivate) {
				return Promise.resolve({ ...toState });
			}
			return Promise.resolve({})
				.then(() => toRoute.onActivate(dependencies.store, toState, fromState))
				.then(() => ({ ...toState }));
		};
	};
}

router.useMiddleware(OnActivateMiddlewareFactory(routes));

export default router;
