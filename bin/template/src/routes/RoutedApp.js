import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5'
import routes from './routes';

function RoutedApp(props) {
	const currentRoute = routes.find(r => r.name === props.router.route.name);
	const Component = currentRoute.component;
	return createElement(Component);
}

const mapStateToProps = state => ({ 
	router: routeNodeSelector('')(state) 
});

export default connect(mapStateToProps)(RoutedApp);