const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = ( env, arg ) => {
	const runMode = arg.env.runMode || ( arg.mode==='production'? 'production' : 'mocks' )

	console.info( '\x1b[33m', `Running webpack for ${ runMode }\n` )

	return {
		mode: 'development',
		entry: {
			'aroi-pay': './src/index.tsx'
		},
		output: {
			filename: '[name].main.js'
		},
		devtool: 'source-map',
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
		},
		devServer: {
			host: '0.0.0.0'
		},
		module: {
			rules: [
				{
					test: /\.(png|jpe?g|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'images',
								esModule: false,
							},
						},
					],
				},
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
				},
				{
					test: /\.svg$/,
					use: [
						'desvg-loader/react', // Add loader (use 'desvg-loader/react' for React)
						'svg-loader', // svg-loader must precede desvg-loader
					],
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								url: false
							}
						}
					]
				},
				{
			    test: /\.scss$/,
			    use: [
			      MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								url: false
							}
						},
			      "sass-loader"
			    ],
			  },
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'aroi-pay.css'
			}),
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				templateParameters: {
					title: 'Aroi Pay'
				},
				hash: true,
			}),
			new webpack.DefinePlugin({
				'process.env.RUN_MODE': JSON.stringify( runMode ),
			})
		]
	}
}