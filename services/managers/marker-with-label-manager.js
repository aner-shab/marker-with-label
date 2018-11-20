var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable, NgZone } from '@angular/core';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { Observable } from 'rxjs';
var MarkerWithLabelManager = /** @class */ (function (_super) {
    __extends(MarkerWithLabelManager, _super);
    function MarkerWithLabelManager(_mapsWrapper, _zone) {
        var _this = _super.call(this, _mapsWrapper, _zone) || this;
        _this._mapsWrapper = _mapsWrapper;
        _this._zone = _zone;
        _this._markerInstance = new Promise(function (resolver) {
            _this._mapsWrapper.getNativeMap().then(function (map) {
                var markerWithLabel = require('markerwithlabel')(google.maps);
                resolver({ markerWithLabel: markerWithLabel, map: map });
            });
        });
        return _this;
    }
    MarkerWithLabelManager.prototype.addMarker = function (marker) {
        var markerPromise = this._markerInstance.then(function (_a) {
            var markerWithLabel = _a.markerWithLabel, map = _a.map;
            var newMarker = new markerWithLabel({
                position: { lat: marker.latitude, lng: marker.longitude },
                labelContent: marker.labelContent,
                labelClass: marker.labelClass,
                labelAnchor: marker.labelAnchor,
                labelInBackground: marker.labelInBackground,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
                map: map,
                animation: (typeof marker.animation === 'string') ? google.maps.Animation[marker.animation] : marker.animation
            });
            return newMarker;
        });
        this._markers.set(marker, markerPromise);
    };
    MarkerWithLabelManager.prototype.updateLabelContent = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setOptions({ labelContent: marker.labelContent }); });
    };
    MarkerWithLabelManager.prototype.updateLabelClass = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setOptions({ labelClass: marker.labelClass }); });
    };
    MarkerWithLabelManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return new Observable(function (observer) {
            _this._markers.get(marker).then(function (m) {
                google.maps.event.addListener(m, eventName, function (e) {
                    e.latLng = m.getPosition();
                    _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    MarkerWithLabelManager.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MarkerWithLabelManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return MarkerWithLabelManager;
}(MarkerManager));
export { MarkerWithLabelManager };
//# sourceMappingURL=marker-with-label-manager.js.map
