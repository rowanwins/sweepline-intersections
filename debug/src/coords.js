
import L from 'leaflet';

L.Coordinates = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd (map) {
        this._container = L.DomUtil.create('div', 'leaflet-bar')
        this._container.style.background = '#ffffff'
        map.on('mousemove', this._onMouseMove, this)
        return this._container
    },

    _onMouseMove (e) {
        this._container.innerHTML = `<span style="padding: 5px">
        ${e.latlng.lng.toFixed(5)} ${e.latlng.lat.toFixed(5)} </span>`
    }

})
