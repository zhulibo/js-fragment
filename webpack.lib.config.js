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

// 手动修改版本号
// git add -A
// git commit -m '666'
// npm publish
