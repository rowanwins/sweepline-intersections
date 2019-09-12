import TinyQueue from 'tinyqueue'
import Segment from './Segment'

import {checkWhichEventIsLeft, checkWhichSegmentHasRightEndpointFirst} from './compareEvents'
import {fillEventQueue} from './fillQueue'
import {testSegmentIntersect} from './utils'

import {debugEventAndSegments, debugRemovingSegment} from './debug'

export default function bentleyOttmann (geojson) {
    const intersectionPoints = []
    const eventQueue = new TinyQueue([], checkWhichEventIsLeft);

    fillEventQueue(geojson, eventQueue)

    let currentSegment = null

    const outQueue = new TinyQueue([], checkWhichSegmentHasRightEndpointFirst);

    while (eventQueue.length) {
        const event = eventQueue.pop();
        if (event.isLeftEndpoint) {
            // debugEventAndSegments(event.p, outQueue.data)
            const segment = new Segment(event)
            for (let i = 0; i < outQueue.data.length; i++) {
                const intersection = testSegmentIntersect(segment, outQueue.data[i])
                if (intersection !== false) intersectionPoints.push(intersection)
            }
            outQueue.push(segment)
        } else if (event.isLeftEndpoint === false) {
            const seg = outQueue.pop()
            // debugRemovingSegment(event.p, seg)
        }
    }
    return intersectionPoints
}

