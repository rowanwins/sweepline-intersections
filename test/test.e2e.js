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

test('ignoreSelfIntersections param works', (t) => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'notSimple', 'example.geojson'))
    const selfIntersectionsIgnored = sweepline(geojson, true)
    t.is(selfIntersectionsIgnored.length, 0)

    const intersections = sweepline(geojson, false)
    t.is(intersections.length, 3)
    t.deepEqual(intersections[0], [19.88085507071179, -9.98118374351003])
})
