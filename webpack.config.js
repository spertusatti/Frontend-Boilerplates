const path = require('path');
const { paths, environments } = require('./tasks/config/options');
const _ = require('./tasks/config/helpers');

let rules = require('require.all')('./tasks/webpack/rules');
let plugins = require('require.all')('./tasks/webpack/plugins');

module.exports = env => {
    let environment = env.NODE_ENV;
    env.NODE_ENV = JSON.stringify(environment);

    const config = {};

    rules((name, rule) => rule(environment, environments, config));
    plugins((name, rule) => rule(environment, environments, config));

    return ({
        mode: 'development',
        entry: {
            app: _.files(paths.src.app.main),
            vendor: _.files(paths.src.app.vendor),
        },
        output: {
            path: path.resolve(__dirname, _.folder(paths.dist.scripts)),
            filename: '[name].js',
            publicPath: '/scripts/'
        },
        module: {
            rules: [
                // rules.lint,
                ...rules.components,
                rules.scripts,
            ]
        },
        plugins: [
            plugins.globals,
            plugins.uglify,
            ...plugins.vue(path.resolve(__dirname, _.folder(paths.src.app)))
        ],
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.vue.ts'],
            modules: [
                path.resolve(__dirname, _.folder(paths.dist.styles)),
                'node_modules'
            ],
            alias: {
                'styles': path.resolve(__dirname, _.folder(paths.src.styles) + '/base'),
                '~': path.resolve(__dirname, _.folder(paths.src.app)),
                'vue$': 'vue/dist/vue.runtime.common.js'
            }
        },
        devtool: (() => environment === environments.production ? false : 'inline-source-map')(),
        ...config
    })
};