// https://symfony.com/doc/current/frontend/encore/advanced-config.html#defining-multiple-webpack-configurations
// yarn encore dev --config-name nrjConfig
// In Twig :
// {{ encore_entry_script_tags('app', null, 'firstConfig') }}
// {{ encore_entry_link_tags('global', null, 'firstConfig') }}

const Path = require('path');
const glob = require("glob");
var Encore = require('@symfony/webpack-encore');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var PathGlobal =  Path.resolve(__dirname, 'vendor/enrj/front-package/Resources/assets');
var dotenv = require('dotenv');

// define NRJ configuration
Encore
    .configureDefinePlugin(options => {
        const env = dotenv.config();

        if (env.error) {
            throw env.error;
        }
        for (const key in env.parsed) {
            options['process.env'][key] = JSON.stringify(env.parsed[key]);
        }
    })
    .addAliases({
        "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
        Path: Path.resolve(__dirname, 'assets'),
        PathGlobal: PathGlobal,
        PathNodeModules: Path.resolve(__dirname, 'node_modules')
    })
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        ScrollMe: 'scrollme',
        'window.ScrollMe': 'scrollme'
    })
    .addLoader({
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        },
        exclude: /node_modules/
    })
    .addPlugin(
        new StyleLintPlugin()
    )
    .setOutputPath('public/build/nrj/')
    .setPublicPath('/build/nrj')
    //.addEntry('app', './assets/js/app.js')
    .addStyleEntry('css/app', './assets/nrj/scss/app.scss')
    .enableSassLoader()
    .enablePostCssLoader()
    .enableReactPreset()
    .splitEntryChunks()
    .autoProvidejQuery()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureFilenames({
        js: '[name].[hash:6].js'
    })
;

// build the first configuration
const nrjConfig = Encore.getWebpackConfig();

// Set a unique name for the config (needed later!)
nrjConfig.name = 'nrjConfig';

// reset Encore to build the second config
Encore.reset();

// define Nostalgie configuration
Encore
    .configureDefinePlugin(options => {
        const env = dotenv.config();

        if (env.error) {
            throw env.error;
        }
        for (const key in env.parsed) {
            options['process.env'][key] = JSON.stringify(env.parsed[key]);
        }
    })
    .addAliases({
        "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
        Path: Path.resolve(__dirname, 'assets'),
        PathGlobal: PathGlobal,
        PathNodeModules: Path.resolve(__dirname, 'node_modules')
    })
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        ScrollMe: 'scrollme',
        'window.ScrollMe': 'scrollme'
    })
    .addLoader({
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        },
        exclude: /node_modules/
    })
    .addPlugin(
        new StyleLintPlugin()
    )
    .setOutputPath('public/build/nostalgie/')
    .setPublicPath('/build/nostalgie')
    //.addEntry('app', './assets/js/app.js')
    .addStyleEntry('css/app', './assets/nostalgie/scss/app.scss')
    .enableSassLoader()
    .enablePostCssLoader()
    .enableReactPreset()
    .splitEntryChunks()
    .autoProvidejQuery()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureFilenames({
        js: '[name].[hash:6].js'
    })

;

// build the second configuration
const nostalgieConfig = Encore.getWebpackConfig();

// Set a unique name for the config (needed later!)
nostalgieConfig.name = 'nostalgieConfig';

// export the final configuration as an array of multiple configurations
module.exports = [nrjConfig, nostalgieConfig];