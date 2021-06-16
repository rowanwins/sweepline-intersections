import TinyQueue from 'tinyqueue'

import {checkWhichEventIsLeft} from './compareEvents'
import fillEventQueue from './fillQueue'
import runCheck from './runCheck'

export default function sweeplineIntersections (geojson, ignoreSelfIntersections) {
    const eventQueue = new TinyQueue([], checkWhichEventIsLeft)
    fillEventQueue(geojson, eventQueue)
    return runCheck(eventQueue, ignoreSelfIntersections)
}

