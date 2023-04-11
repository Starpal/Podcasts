const path = require("path");

module.exports = {
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "bundle.js"
	},
	devServer: {
		historyApiFallback: true,
		static: './',
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: "url-loader",
				options: { limit: false },
			},
		],
	},
};