import test from 'ava'
import path from 'path'
import glob from 'glob'

import load from 'load-json-file'

import sweepline from '../src/main.js'

const trueFixtures = glob.sync(path.join(__dirname, 'fixtures', 'simple', '*.geojson'))
const falseFixtures = glob.sync(path.join(__dirname, 'fixtures', 'notSimple', '*.geojson'))

test('simple fixtures', (t) => {
    trueFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name
        const geojson = load.sync(filepath)
        const ips = sweepline(geojson)
        t.is(ips.length, 0,  `[true] ${name}`)
    })
})


test('complex fixtures', (t) => {
    falseFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name
        const geojson = load.sync(filepath)
        const ips = sweepline(geojson)
        t.deepEqual(ips.length, geojson.properties.expectedIntersections,  `[complex] ${name}`)
    })
})

test('input data is not modified', (t) => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'notSimple', 'example.geojson'))
    const clonedData = JSON.parse(JSON.stringify(geojson))
    sweepline(geojson)
    t.deepEqual(geojson, clonedData)
})
