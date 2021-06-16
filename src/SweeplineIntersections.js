import TinyQueue from 'tinyqueue'
import {checkWhichEventIsLeft} from './compareEvents'
import fillEventQueue from './fillQueue'
import runCheck from './runCheck'

export default class SweeplineIntersections {

    constructor () {
        this._eventQueue = new TinyQueue([], checkWhichEventIsLeft)
    }

    addData (geojson, alternateEventQueue) {
        if (alternateEventQueue !== undefined) {
            const newQueue = new TinyQueue([], checkWhichEventIsLeft)
            for (let i = 0; i < alternateEventQueue.length; i++) {
                newQueue.push(alternateEventQueue.data[i])
            }
            this._eventQueue = newQueue
        }
        fillEventQueue(geojson, this._eventQueue)
    }

    cloneEventQueue () {
        const newQueue = new TinyQueue([], checkWhichEventIsLeft)
        for (let i = 0; i < this._eventQueue.length; i++) {
            newQueue.push(this._eventQueue.data[i])
        }
        return newQueue
    }

    getIntersections (ignoreSelfIntersections) {
        return runCheck(this._eventQueue, ignoreSelfIntersections)
    }
}
