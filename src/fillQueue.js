import Event from './Event'
import {checkWhichEventIsLeft} from './compareEvents'

export function fillEventQueue (geojson, eventQueue) {
    const geom = geojson.type === 'Feature' ? geojson.geometry : geojson

    let coords = geom.coordinates
    // standardise the input
    if (geom.type === 'Polygon') coords = [coords]

    for (let i = 0; i < coords[0].length; i++) {
        let currentP = coords[0][i][0]
        let nextP = null

        for (let ii = 0; ii < coords[0][i].length - 1; ii++) {
            nextP = coords[0][i][ii + 1]

            const e1 = new Event(currentP)
            const e2 = new Event(nextP)

            e1.otherEvent = e2;
            e2.otherEvent = e1;

            if (checkWhichEventIsLeft(e1, e2) > 0) {
                e2.isLeftEndpoint = true;
                e1.isLeftEndpoint = false
            } else {
                e1.isLeftEndpoint = true;
                e2.isLeftEndpoint = false
            }
            eventQueue.push(e1)
            eventQueue.push(e2)

            currentP = nextP
        }
    }
}
