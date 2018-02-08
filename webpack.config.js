let Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/assets/')
    .setPublicPath('/assets')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(true)
    .addEntry('js/app', './src/js/app.js')
    .addStyleEntry('css/app', './src/css/app.scss')
    .enableSassLoader()
;

module.exports = Encore.getWebpackConfig();
