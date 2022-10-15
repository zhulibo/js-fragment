import typescript from 'rollup-plugin-typescript2';
const pkg = require('./package.json');

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: './lib/index.umd.js',
      format: 'umd',
      name: 'fragment',
    },
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
        },
      },
      useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录配置
    })
  ]
}

// 手动修改版本号
// npm run build
// git add -A
// git commit -m '666'
// npm publish

// todo cjs、es、umd导入测试 jest测试
