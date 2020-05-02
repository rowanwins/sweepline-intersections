import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import {terser} from 'rollup-plugin-terser'

const output = (file, format, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'sweeplineIntersections',
        file,
        format,
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/sweeplineIntersections.js', 'umd', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ]),
    output('./dist/sweeplineIntersections.esm.js', 'esm', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ]),
    output('./dist/sweeplineIntersections.min.js', 'umd', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve(),
        terser()
    ])
]
