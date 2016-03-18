'use strict';

let webpack = require('webpack'),
	path = require('path');

module.exports = {
	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: [
			path.join(__dirname, './src')
		],
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: [
				'babel-loader'
			]
		}]
	}
};