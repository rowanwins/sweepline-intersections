export function debugEventAndSegments (event, segments) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)


    segments.forEach(function (seg) {
        L.polyline([
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
        ], {color: 'grey'}).addTo(lines)
    })

    debugger

    eLayer.remove()
    lines.remove()
}

export function debugRemovingSegment (event, seg) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.y, event.x], {color: 'red'}).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
        [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
    ], {color: 'grey'}).addTo(lines)

    debugger

    eLayer.remove()
    lines.remove()
}
