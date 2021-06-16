import TinyQueue from 'tinyqueue'
import Segment from './Segment'

import {checkWhichSegmentHasRightEndpointFirst} from './compareEvents'
import {testSegmentIntersect} from './utils'
// import {debugEventAndSegments, debugRemovingSegment} from './debug'

export default function runCheck (eventQueue, ignoreSelfIntersections) {
    ignoreSelfIntersections = ignoreSelfIntersections ? ignoreSelfIntersections : false

    const intersectionPoints = []
    const outQueue = new TinyQueue([], checkWhichSegmentHasRightEndpointFirst)

    while (eventQueue.length) {
        const event = eventQueue.pop()
        if (event.isLeftEndpoint) {
            // debugEventAndSegments(event.p, outQueue.data)
            const segment = new Segment(event)
            for (let i = 0; i < outQueue.data.length; i++) {
                const otherSeg = outQueue.data[i]
                if (ignoreSelfIntersections) {
                    if (otherSeg.leftSweepEvent.featureId === event.featureId) continue
                }
                const intersection = testSegmentIntersect(segment, otherSeg)
                if (intersection !== false) intersectionPoints.push(intersection)
            }
            outQueue.push(segment)
        } else if (event.isLeftEndpoint === false) {
            outQueue.pop()
            // const seg = outQueue.pop()
            // debugRemovingSegment(event.p, seg)
        }
    }
    return intersectionPoints
}
