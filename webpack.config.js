const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: "production",
  output: {
    filename: 'mw-homepage-test-search-view.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.raw\.html/,
            type: 'asset/source'
        },
        { 
            test: /\.html/, 
            loader: "handlebars-loader"
        }
    ]
   },
};
