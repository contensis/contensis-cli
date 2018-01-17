const fetch = require('node-fetch');

const defaults = {
	rootUrl: '',
	projectId: '',
	accessToken: '',
	contentTypeId: '',
	projectName: '',
	userName: '',
	password: '',
	folder: '',

	dependencies: [
		'react', 
		'react-dom', 
		'redux', 
		'redux-thunk',
		'react-redux', 
		'babel-polyfill', 
		'contensis/api-delivery-js',
		'history', 
		'reselect', 
		'redux-saga',
		'router5', 'react-router5', 'redux-router5'
	],

	devDependencies: ['gulp', 'webpack', 'webpack-dev-server', 'html-webpack-plugin', 'babel-core', 'babel-loader', 
		'babel-preset-env', 'babel-preset-stage-2', 'babel-preset-react', 'gulp-contensis-sync', 'babel-eslint', 
		'eslint', 'eslint-config-airbnb', 'eslint-config-airbnb-base', 'eslint-import-resolver-webpack', 
		'eslint-plugin-import', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react', 'eslint-plugin-redux-saga', 'prop-types'
	]
};

exports.extend = function(settings) {
	settings = Object.assign({}, defaults, settings);
	settings.contentTypeName = settings.contentTypeId.substr(0, 1).toUpperCase() + settings.contentTypeId.substr(1)

	return fetch(`${settings.rootUrl}/api/delivery/projects/${settings.projectId}/contentTypes/${settings.contentTypeId}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			accessToken: settings.accessToken
		}
	})
	.then(response => response.json())
	.then(contentType => Object.assign({}, settings, { contentType }));
}