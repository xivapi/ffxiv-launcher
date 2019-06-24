let Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/assets/')
    .setPublicPath('/assets')
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('js/app', './src/js/app.js')
    .addStyleEntry('css/app', Encore.isProduction() ? './src/css/app.scss' : './src/css/debug.scss')
    .enableSingleRuntimeChunk()
    .enableSassLoader()
;
// enaboe node environment
let config = Encore.getWebpackConfig();
config.target = 'electron-renderer';
module.exports = config;
