const BundleTracker = require("webpack-bundle-tracker");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const dirProd = process.env.VUE_APP_PUBLIC_PATH || 'https://nyc3.digitaloceanspaces.com/nimd/static/';

module.exports = {
    //publicPath: 'http://0.0.0.0:8080/',
    //outputDir: './dist/',
    publicPath: process.env.NODE_ENV === 'production' ? dirProd : 'http://0.0.0.0:8080/',
    outputDir: './out_front_control/',
    assetsDir: './__assets_front_control/',
    indexPath: '__index_front_control.html',

    chainWebpack: config => {

        config.optimization
            .splitChunks(false)

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{filename: './webpack-stats.json'}])

        config
            .plugin('CleanWebpackPlugin')
            .use(CleanWebpackPlugin)
    }
};