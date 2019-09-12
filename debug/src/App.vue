<template>
  <div id="app"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-polylinedecorator'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './coords';
import sweepline from '../../src/main'

// Hack to get the markers into Vue correctly
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
})

// const trouble = require('../../test/fixtures/notSimple/switzerlandKinked.geojson')
// const trouble = require('../../test/fixtures/notSimple/superbad.geojson')
const trouble = require('../../test/fixtures/notSimple/example.geojson')

export default {
    name: 'App',
    mounted () {
        const layer = L.geoJSON(trouble)

        let map = window.map = L.map('app', {
            crs: L.CRS.Simple
        })
        map.fitBounds(layer.getBounds());

        layer.addTo(map)

        map.addControl(new L.Coordinates())

        const intersections = sweepline(trouble)
        const layerGroup = L.layerGroup([]).addTo(map)

        intersections.forEach(function (ip) {
            L.circleMarker([ip[1], ip[0]]).addTo(layerGroup)
        })
    }
}

</script>

<style>
 html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0px;
 }

 .leaflet-tooltip {
    white-space: pre-wrap;
 }
</style>
