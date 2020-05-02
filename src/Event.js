
export default class Event {

    constructor (p) {
        this.p = {
            x: p[0],
            y: p[1]
        }

        this.otherEvent = null
        this.isLeftEndpoint = null
    }

    isSamePoint (eventToCheck) {
        return this.p.x === eventToCheck.p.x && this.p.y === eventToCheck.p.y
    }
}
