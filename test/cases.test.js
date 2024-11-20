import {test, expect} from 'vitest'
import path from 'path'
import glob from 'glob'

import load from 'load-json-file'

import sweepline from '../src/main'

const trueFixtures = glob.sync(path.join(__dirname, 'fixtures', 'simple', '*.geojson'))
const falseFixtures = glob.sync(path.join(__dirname, 'fixtures', 'notSimple', '*.geojson'))

test('simple fixtures', () => {
    for (const filepath of trueFixtures) {
        const geojson = load.sync(filepath)
        const ips = sweepline(geojson)
        expect(ips.length).toBe(0)
    }
})


test('complex fixtures', () => {
    for (const filepath of falseFixtures) {
        const geojson = load.sync(filepath)
        const ips = sweepline(geojson)
        expect(ips.length).toBe(geojson.properties.expectedIntersections)
    }
})

test('input data is not modified', () => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'notSimple', 'example.geojson'))
    const clonedData = JSON.parse(JSON.stringify(geojson))
    sweepline(geojson)
    expect(geojson).toEqual(clonedData)
})

test('ignoreSelfIntersections param works', () => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'notSimple', 'example.geojson'))
    const selfIntersectionsIgnored = sweepline(geojson, true)
    expect(selfIntersectionsIgnored.length).toBe(0)

    const intersections = sweepline(geojson, false)
    expect(intersections.length).toBe(3)
    expect(intersections[0]).toEqual([19.88085507071179, -9.98118374351003])
})
