import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: "json" };
import {banner} from "./src/banner.js";

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      banner
    },
    {
      file: pkg.module,
      format: 'es',
      banner
    },
    {
      file: './lib/index.umd.js',
      format: 'umd',
      name: 'fragment',
      banner
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录配置
    })
  ]
}
