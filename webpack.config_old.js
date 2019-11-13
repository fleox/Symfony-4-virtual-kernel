var Encore = require('@symfony/webpack-encore');
var StyleLintPlugin = require('stylelint-webpack-plugin');

Encore

// you can use this method to provide other common global variables,
// such as '_' for the 'underscore' library
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        ScrollMe: 'scrollme',
        'window.ScrollMe': 'scrollme'
    })

    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */

    //.addEntry('app', './assets/js/app.js')

    .addStyleEntry('css/app', './assets/nrj/scss/app.scss')
    //.addStyleEntry('css/guideline/guideline', './assets/scss/guideline.scss')
    //.addStyleEntry('css/guideline/guideline-variables', './assets/scss/guideline-variables.scss')


    // yarn add --dev prettier prettier-loader
    .addLoader({
        test: /\.js$/,
        enforce: 'pre',
        loader: 'prettier-loader',
        exclude: /node_modules/,
        options: {
            parser: 'babel'
        }
    })

    .enableSingleRuntimeChunk()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables Sass/SCSS support
    .enableSassLoader()

    // prefix css
    .enablePostCssLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')

    .addPlugin(
        new StyleLintPlugin()
    )
;

module.exports = Encore.getWebpackConfig();