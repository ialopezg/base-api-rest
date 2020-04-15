import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const filename = pkg.main.replace('.js', '');
const outputDir = 'dist/lib';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    { dir: `${outputDir}`, entryFileNames: `${filename}.min.js`, format: 'cjs' },
    { dir: `${outputDir}`, entryFileNames: `${filename}.js`, format: 'cjs', sourcemap: true  },
    { dir: `${outputDir}`, entryFileNames: `${filename}-[format].js`, format: 'esm' },
    { dir: `${outputDir}`, entryFileNames: `${filename}-[format].js`, format: 'umd', name: 'ApiREST' },
    {
      dir: `${outputDir}`,
      entryFileNames: `${filename}-[format].js`,
      name: 'ApiREST', // the global which can be used in a browser
      format: "iife"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    production && terser({
      include: [/^.+\.min\.js$/, "*esm*"]
    })
  ]
};
