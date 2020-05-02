export function areCoordsSame (p1, p2) {
    return Math.abs(p1 - p2) < Number.EPSILON
}

export function testSegmentIntersect (seg1, seg2) {
    if (seg1 === null || seg2 === null) return false

    if (seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
        seg1.rightSweepEvent.isSamePoint(seg2.rightSweepEvent) ||
        seg1.leftSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
        seg1.leftSweepEvent.isSamePoint(seg2.rightSweepEvent)) return false

    const x1 = seg1.leftSweepEvent.p.x
    const y1 = seg1.leftSweepEvent.p.y
    const x2 = seg1.rightSweepEvent.p.x
    const y2 = seg1.rightSweepEvent.p.y
    const x3 = seg2.leftSweepEvent.p.x
    const y3 = seg2.leftSweepEvent.p.y
    const x4 = seg2.rightSweepEvent.p.x
    const y4 = seg2.rightSweepEvent.p.y

    const denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1))
    const numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))
    const numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))

    if (denom === 0) {
        if (numeA === 0 && numeB === 0) return false
        return false
    }

    const uA = numeA / denom
    const uB = numeB / denom

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        const x = x1 + (uA * (x2 - x1))
        const y = y1 + (uA * (y2 - y1))
        return [x, y]
    }
    return false
}
