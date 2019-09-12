export function checkWhichEventIsLeft (e1, e2) {
    if (e1.p.x > e2.p.x) return 1;
    if (e1.p.x < e2.p.x) return -1;

    if (e1.p.y !== e2.p.y) return e1.p.y > e2.p.y ? 1 : -1;
    return 1
}

export function checkWhichSegmentHasRightEndpointFirst (seg1, seg2) {
    if (seg1.rightSweepEvent.p.x > seg2.rightSweepEvent.p.x) return 1;
    if (seg1.rightSweepEvent.p.x < seg2.rightSweepEvent.p.x) return -1;

    if (seg1.rightSweepEvent.p.y !== seg2.rightSweepEvent.p.y) return seg1.rightSweepEvent.p.y < seg2.rightSweepEvent.p.y ? 1 : -1;
    return 1
}
