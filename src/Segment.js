export default class Segment {

    constructor (event, segmentId) {
        this.leftSweepEvent = event
        this.rightSweepEvent = event.otherEvent
        this.segmentId = segmentId
    }

    get earliestVertexId () {
        return Math.min(this.leftSweepEvent.vertexId, this.rightSweepEvent.vertexId)
    }

    get isPartOfOuterRing () {
        return this.leftSweepEvent.ringId === 0
    }
}
