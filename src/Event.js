
export default class Event {

    constructor (p, featureId, ringId, eventId) {
        this.p = {
            x: p[0],
            y: p[1]
        }
        this.featureId = featureId
        this.ringId = ringId
        this.eventId = eventId

        this.otherEvent = null
        this.isLeftEndpoint = null
    }

    isSamePoint (eventToCheck) {
        return this.p.x === eventToCheck.p.x && this.p.y === eventToCheck.p.y
    }

    asNewXY () {
        return [this.p.x, this.p.y]
    }
}

