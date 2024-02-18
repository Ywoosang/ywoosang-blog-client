const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
			}),
		],
	},
	devServer: {
		// 구름 ide 접속시 Invalid Host header 에러 해결
		allowedHosts: ['all'],
		// client: {
		//   overlay: false
		// }
	},
	transpileDependencies: true,
});
