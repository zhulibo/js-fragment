import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: "json" };

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
      useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录配置
    })
  ]
}
