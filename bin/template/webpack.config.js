var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var NODE_MODULES = path.resolve(__dirname, 'node_modules');
var DELIVERY_API = path.resolve(__dirname, 'node_modules/api-delivery-js');

module.exports = {

	entry: APP_DIR + '/index.js',
	
	output: {
		path: BUILD_DIR,
		filename: '<%= contentTypeName %>.js'
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel-loader'],
				include: [APP_DIR, DELIVERY_API]
			}
		]
	},

	resolve: {
        extensions: ['.js', '.jsx']
	},
	
	plugins: [
		new HtmlWebpackPlugin({
			template: APP_DIR + '/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		})
	]
};
