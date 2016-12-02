var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname, "client"),
	devtool: debug ? "inline-sourcemap" : null,
	entry: [
		"./js/client.js"
	],
	output: {
		path: __dirname + "/client/",
		filename: "client.min.js"
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
				}
			},
			{
				test: /\.scss?$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	plugins: debug ? null : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
	]
}