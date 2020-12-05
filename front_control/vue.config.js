const BundleTracker = require("webpack-bundle-tracker");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Debido a que la dirección de despliegue de digital ocean spaces no funciona
// cuando los archivos estáticos se sirven desde el mismo servidor de la 
// aplicación (por ejemplo en modo dev o en un despliegue que no implique
// usar un CDN como spaces), por lo tanto en un archivo .env.local se puede
// definir un path de despliegue como una variable de entorno pero por defecto
// se usa la dirección del CDN.

// Por ejemplo, el contenido de un archivo .env.local para que el bundle sea
// servido desde una dirección del mismo dominio (por ejemplo '/static/')
// el contenido que se colocaría es:

//
// VUE_APP_PUBLIC_PATH=/static/ 
//

// Si se quiere servir el bundle desde el repositorio en CDN pero el archivo
// .env.local existe, dejar el archivo vacío.

const dirProd = process.env.VUE_APP_PUBLIC_PATH || 'https://nyc3.digitaloceanspaces.com/ejemplo/static/';

module.exports = {
    //publicPath: 'http://0.0.0.0:8080/',
    //outputDir: './dist/',
    publicPath: process.env.NODE_ENV === 'production' ? dirProd : 'http://0.0.0.0:8080/',
    outputDir: './out_front_estadisticas/',
    assetsDir: './__assets_front_estadisticas/',
    indexPath: '__index_front_estadisticas.html',

    chainWebpack: config => {

        config.optimization
            .splitChunks(false)

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{ filename: './webpack-stats.json' }])

        config
            .plugin('CleanWebpackPlugin')
            .use(CleanWebpackPlugin)
    }
};