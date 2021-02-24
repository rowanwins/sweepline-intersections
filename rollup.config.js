import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import {terser} from 'rollup-plugin-terser'

const output = (input, file, format, plugins) => ({
    input,
    output: {
        name: 'sweeplineIntersections',
        file,
        format,
        exports: 'default'
    },
    plugins
})

export default [
    output('./src/main.js', './dist/sweeplineIntersections.js', 'umd', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ]),
    output('./src/main.js', './dist/sweeplineIntersections.esm.js', 'esm', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ]),
    output('./src/main.js', './dist/sweeplineIntersections.min.js', 'umd', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve(),
        terser()
    ]),
    output('./src/SweeplineIntersections.js', './dist/SweeplineIntersectionsClass.js', 'umd', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ]),
    output('./src/SweeplineIntersections.js', './dist/SweeplineIntersectionsClass.esm.js', 'esm', [
        strip(['debugEventAndSegments', 'debugRemovingSegment']),
        commonjs(),
        resolve()
    ])
]
