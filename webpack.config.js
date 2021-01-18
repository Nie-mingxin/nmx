// 导入处理路径的模块
var path = require('path');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
	mode: 'development', // 配置环境
	devtool: 'inline-source-map', // 代码调试

	entry: {
		one: './src/js/index.js',
		two: './src/js/other.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'), //配置输出文件路径
		filename: 'js/[name].js' //对象形式输入的输出文件名
	},
	//配置插件
	plugins: [
		// 在打包之前做清空dist的操作
		new CleanWebpackPlugin(),
		new htmlWebpackPlugin({
			title: 'my title',
			template: './src/index.html', //模板路径
			// filename:'index.html',//自动生成的HTML文件的名称
			// inject: 'head',// 文件在头部引入
			minify: true // 代码压缩
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		})
	],
	devServer: {
		contentBase: './src', // 配置运行文件的根目录
		host: '127.0.0.1',
		port: 32194,
		open: true // 运行后自动在浏览器中打开
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader'
				]
			},
			{test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
			{test: /\.(img|png|jpg|gif)$/, use: 'url-loader?limit=1&outputPath=images&name=[hash:5]-[name].[ext]'},
			{test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
			{test: /\.html$/, use: 'html-loader'}
		]
	}
};
