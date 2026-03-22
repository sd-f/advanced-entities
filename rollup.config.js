import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const dev = process.env.ROLLUP_WATCH;
const port = process.env.PORT || 5000;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: port,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  // getBabelOutputPlugin({
  //   presets: [
  //     [
  //       '@babel/preset-env',
  //       {
  //         targets: {
  //           browsers: ['last 2 versions', 'Android >= 5', 'Chrome >= 60', 'Firefox ESR', 'Safari >= 9'],
  //         },
  //         modules: false,
  //       },
  //     ],
  //   ],
  // }),
  dev && serve(serveopts),
  // !dev &&
  //   terser({
  //     compress: true,
  //     mangle: true,
  //   }),
];

export default [
  {
    input: 'src/advanced-entities-row.ts',
    output: {
      dir: './dist',
      format: 'es',
      sourcemap: true,
    },
    plugins: [...plugins],
    watch: {
      exclude: 'node_modules/**',
    },
  },
];
