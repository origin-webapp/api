const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // entry is where, say, your app starts - it can be called main.ts, index.ts, app.ts, whatever
  entry: ['webpack/hot/poll?100', './src/index.ts'],
  // This forces webpack not to compile TypeScript for one time, but to stay running, watch for file changes in project directory and re-compile if needed
  watch: false,
  // Is needed to have in compiled output imports Node.JS can understand. Quick search gives you more info
  target: 'node',
  // Prevents warnings from TypeScript compiler
  externals: [
    {
      // "webpack/hot/poll?100": 'webpack/hot/poll?100',
      "tedious": "tedious"
    },
  ],

  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // alias: {
    //   'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
    //   'pgpass$': path.join(__dirname, 'aliases/pgpass.js'),
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};