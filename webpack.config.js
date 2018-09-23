let Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/assets/')
    .setPublicPath('/assets')
    .enableSourceMaps(true)
    .addEntry('js/app', './src/js/app.js')
    .addStyleEntry('css/app', './src/css/app.scss')
    .enableSassLoader()
;

// enaboe node environment
let config = Encore.getWebpackConfig();
config.target = 'electron-renderer';
module.exports = config;
