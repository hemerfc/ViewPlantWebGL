
/* Export configuration */
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/boot.ts'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    resolve: { extensions: [".web.ts", ".web.js", ".ts", ".js"] }
}