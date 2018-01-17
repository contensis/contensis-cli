var webpack = require("webpack");
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var NODE_MODULES = path.resolve(__dirname, 'node_modules');

module.exports = {

	entry: APP_DIR + '/boot.js',
	
	output: {
		path: BUILD_DIR,
		filename: '<%= contentTypeName %>.js',
		library: ['<%= contentTypeName %>']
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel-loader'],
				include: [APP_DIR]
			}
		]
	},

	resolve: {
        extensions: ['.js', '.jsx']
	},
	
	externals: {
		'api-delivery-js': 'Zengenti.Contensis'
	},
	
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new UglifyJSPlugin({
            sourceMap: true,
            output: {
                comments: false
            },
            mangle: {
                keep_fnames: true
            }
        })
	]
};