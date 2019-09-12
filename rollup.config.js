import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (file, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'sweeplineIntersections',
        file,
        format: 'umd',
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/sweeplineIntersections.js', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ]),
    output('./dist/sweeplineIntersections.min.js', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve(),
        terser()
    ])
]
