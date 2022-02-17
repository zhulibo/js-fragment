const path = require('path');

module.exports = {
  mode: "production",
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './lib'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages'),
    }
  },
};

// git add -A
// git commit -m '666'
// npm version patch/minor/major 升级修订版本号/次版本号/主版本号
// npm publish
