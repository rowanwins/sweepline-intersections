import Event from './Event'
import {checkWhichEventIsLeft} from './compareEvents'

export default function fillEventQueue (geojson, eventQueue) {
    if (geojson.type === 'FeatureCollection') {
        const features = geojson.features
        for (let i = 0; i < features.length; i++) {
            processFeature(features[i], eventQueue)
        }
    } else {
        processFeature(geojson, eventQueue)
    }
}

let featureId = 0
let ringId = 0
let eventId = 0
function processFeature (featureOrGeometry, eventQueue) {
    const geom = featureOrGeometry.type === 'Feature' ? featureOrGeometry.geometry : featureOrGeometry
    let coords = geom.coordinates
    // standardise the input
    if (geom.type === 'Polygon' || geom.type === 'MultiLineString') coords = [coords]
    if (geom.type === 'LineString') coords = [[coords]]

    for (let i = 0; i < coords.length; i++) {
        for (let ii = 0; ii < coords[i].length; ii++) {
            let currentP = coords[i][ii][0]
            let nextP = null
            ringId = ringId + 1
            for (let iii = 0; iii < coords[i][ii].length - 1; iii++) {
                nextP = coords[i][ii][iii + 1]

                const e1 = new Event(currentP, featureId, ringId, eventId)
                const e2 = new Event(nextP, featureId, ringId, eventId + 1)

                e1.otherEvent = e2
                e2.otherEvent = e1

                if (checkWhichEventIsLeft(e1, e2) > 0) {
                    e2.isLeftEndpoint = true
                    e1.isLeftEndpoint = false
                } else {
                    e1.isLeftEndpoint = true
                    e2.isLeftEndpoint = false
                }
                eventQueue.push(e1)
                eventQueue.push(e2)

                currentP = nextP
                eventId = eventId + 1
            }
        }
    }
    featureId = featureId + 1
}
