import path from 'path'
import Benchmark from 'benchmark'
import bentleyOttmann from 'bentley-ottmann-intersections'
import gpsi from 'geojson-polygon-self-intersections'
import isects from '2d-polygon-self-intersections'
import loadJsonFile from 'load-json-file'

import sweepline from '../dist/sweeplineIntersections.esm.js'

const regression = loadJsonFile.sync(path.join('test', 'fixtures', 'notSimple', 'example1.geojson'))
const switzerland = loadJsonFile.sync(path.join('test', 'fixtures', 'notSimple', 'switzerlandKinked.geojson'))
const chile = loadJsonFile.sync(path.join('test', 'fixtures', 'notSimple', 'chileKinked.geojson'))

const options = {
    onStart () { console.log(this.name) },
    onError (event) { console.log(event.target.error) },
    onCycle (event) { console.log(String(event.target)) },
    onComplete () {
        console.log(`- Fastest is ${this.filter('fastest').map('name')}`)
    }
}

// Switzerland (~700 vertices)
// gpsi x 37.05 ops/sec ±1.77% (49 runs sampled)
// bentleyOttmann x 2,010 ops/sec ±1.52% (89 runs sampled)
// sweepline x 2,621 ops/sec ±0.29% (95 runs sampled)
// isects x 14.29 ops/sec ±2.16% (40 runs sampled)
// - Fastest is sweepline
const suite = new Benchmark.Suite('Switzerland', options)
suite
    .add('gpsi', function () {
        gpsi(switzerland)
    })
    .add('bentleyOttmann', function () {
        bentleyOttmann(switzerland)
    })
    .add('sweepline', function () {
        sweepline(switzerland)
    })
    .add('isects', function () {
        isects(switzerland.geometry.coordinates[0])
    })
    .run()

// Simple Case (6 vertices)
// gpsi x 246,512 ops/sec ±1.23% (90 runs sampled)
// bentleyOttmann x 546,326 ops/sec ±0.66% (92 runs sampled)
// sweepline x 1,157,425 ops/sec ±1.04% (94 runs sampled)
// - Fastest is sweepline
const suite2 = new Benchmark.Suite('Simple Case', options)
suite2
    .add('gpsi', function () {
        gpsi(regression)
    })
    .add('bentleyOttmann', function () {
        bentleyOttmann(regression)
    })
    .add('sweepline', function () {
        sweepline(regression)
    })
    .run()

// Chile - Vertical geometry (17,000 vertices)
// sweepline x 35.64 ops/sec ±1.20% (62 runs sampled)
const suite3 = new Benchmark.Suite('Chile - Vertical geometry (17,000 vertices)', options)
suite3
    // .add('bentleyOttmann', function () {
    //     bentleyOttmann(chile)
    // })
    .add('sweepline', function () {
        sweepline(chile)
    })
    .run()

