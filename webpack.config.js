module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './bundle.js',
        libraryTarget: 'umd'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    mode: 'production',

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    optimization: {
        minimize: false
    }
}
