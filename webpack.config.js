'use strict';

const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpackCleanupPlugin = require('webpack-cleanup-plugin');
const merge = require('webpack-merge');

const rel = process.env.npm_lifecycle_event == 'build';

const common = {
	context: path.resolve(__dirname, 'app'),

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.[chunkhash].js',
		publicPath: '/'
	},

	module: {
		loaders: [
			{
				test: /\.less$/,
				// loader: extractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader'])
				loader: extractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader'])

			},{
			    test: /.(jpe?g|gif|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
      			loader: 'url-loader?limit=1000000&name=[name].[ext]'
    		},{
    			test: /\.js$/,
    			loader: 'babel?presets[]=es2015',
    			exclude: /node_modules/
    		},{
    			test: /\.html$/,
    			loader: 'raw'
    		}
		],
		noParse: ['ws']
	},

	externals: ['ws'],

	plugins: [
        new webpack.ProvidePlugin({
            '_': 'lodash',
            '$': 'jquery',
            'moment': 'moment',
            'window.jQuery': 'jquery'
        }),
        new extractTextPlugin('[name].[hash].css'),
        new htmlWebpackPlugin({
			filename: './index.html',
			template: 'index.html',
			chunks: ['index'],
			inject: true
		})
    ]
};

//production
if (rel) {
	console.log('Development environment disabled.');

	module.exports = merge.smart(common, {
		entry: {
			index: ['./index.js']
		},

		plugins: [
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.DedupePlugin(),
			// new webpack.optimize.UglifyJsPlugin(),
			new webpackCleanupPlugin()
		]
	})
//development
} else {
	console.log('Development environment enabled.');

	module.exports = merge.smart(common, {
		entry: {
			index: ['./index.js','webpack-dev-server/client?http://localhost:5000/']
		},
		devtool: 'source-map',
		devServer: {
			host: 'localhost',
			port: 5000,
			contentBase: path.resolve(__dirname, 'build'),
			historyApiFallback: true,
    		hot: true,
			proxy: {
				'/service/api': {
					target: 'http://37.46.129.213:8080',
					secure: false
				}
			}
		}
	})
}
