const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: './examples/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    port: 2010,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages'),
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./examples/index.html"),
    })
  ]
};

// todo use ts
