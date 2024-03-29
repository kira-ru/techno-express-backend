const path = require('path');

module.exports = (env) => ({
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    resolve: {
        extensions: [".ts", ".tsx", ".js"],

        fallback: { "querystring": false },
    },
    module: {
        rules: [
            { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
});
