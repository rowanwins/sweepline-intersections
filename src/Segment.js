export default class Segment {

    constructor (event) {
        this.leftSweepEvent = event
        this.rightSweepEvent = event.otherEvent
    }
}
