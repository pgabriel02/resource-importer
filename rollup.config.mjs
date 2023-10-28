import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from "@rollup/plugin-json";

export default {
    input: 'src/utils/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
		sourcemap: true,
    },
    plugins: [
		nodeResolve(),
		commonjs(),
		json(),
        typescript({ target: 'ESNext' })
    ]
}