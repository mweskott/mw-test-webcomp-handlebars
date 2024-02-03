const path = require('path');

module.exports = {
  entry: './src/app.js',
  mode: "production",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.html/,
            type: 'asset/source'
        }
    ]
   },
};
