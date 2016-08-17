var webpack = require('webpack'),
    path = require("path"),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    validate = require('webpack-validator');
var debug = process.env.NODE_ENV !== 'production';

var config = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    context: __dirname,
    entry: {
        entry: "./src/entry",
        //splits the vendors to separate files
        vendor: []
    },
    output: {path: path.resolve(__dirname, "build"), filename: '[name].js'},
    devServer: {contentBase: __dirname},
    stats: {colors: true}, // Nice colored output
    cache: debug,
    debug: debug,
    devtool: debug ? 'eval' : 'source-map', // Create Sourcemaps for the bundle
    resolve: {
        //all these extensions will be resolved without specifying extension in the `require`
        extensions: ['', '.js'],
        //files in these directory can be required without a relative path
        modulesDirectories: ['node_modules']
    },
    resolveLoader: {root: path.join(__dirname, 'node_modules')},
    module: {
        loaders:  [
            {
                test: /src.*\.js$/,
                loaders: ['babel?presets[]=es2015','ify'],
                exclude: /node_modules/
            },
            {test: /\.json$/, loader: "json"},
            {test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader"},
            {test: /\.(jpe?g|png|gif|ico|htc)$/, loader: 'url-loader?limit=100000&name=assets/[name].[ext]'},
            {test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'},
            {test: /\.html$/, loader: "html"}
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            server: {baseDir: ['./build']}
        }),
        //Generate an extra chunk, which contains common modules shared between entry points.
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.NoErrorsPlugin(),// Avoid publishing files when compilation fails
        new ExtractTextPlugin('[name].css', {allChunks: true}),//extracts all inline style css and combines them to one css file per chunk.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

//validates configuration against a schema and warn if we are trying to do something not sensible.
if (debug)
    validate(config);

module.exports = config;
