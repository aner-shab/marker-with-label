(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@agm/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', '@agm/core'], factory) :
    (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.markerWithLabel = {}),global.ng.core,null,global.ngmaps.core));
}(this, (function (exports,core,rxjs,core$1) { 'use strict';

    var MapsAPILoader = /** @class */ (function () {
        function MapsAPILoader() {
        }
        MapsAPILoader.decorators = [
            { type: core.Injectable },
        ];
        return MapsAPILoader;
    }());

    /**
     * Wrapper class that handles the communication with the Google Maps Javascript
     * API v3
     */
    var GoogleMapsAPIWrapper = /** @class */ (function () {
        function GoogleMapsAPIWrapper(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map =
                new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
        GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
            var _this = this;
            return this._zone.runOutsideAngular(function () {
                return _this._loader.load().then(function () {
                    var map = new google.maps.Map(el, mapOptions);
                    _this._mapResolver(map);
                    return;
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
            this._map.then(function (m) { m.setOptions(options); });
        };
        /**
         * Creates a google map marker with the map context
         */
        GoogleMapsAPIWrapper.prototype.createMarker = function (options, addToMap) {
            if (options === void 0) { options = {}; }
            if (addToMap === void 0) { addToMap = true; }
            return this._map.then(function (map) {
                if (addToMap) {
                    options.map = map;
                }
                return new google.maps.Marker(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
            return this._map.then(function () { return new google.maps.InfoWindow(options); });
        };
        /**
         * Creates a google.map.Circle for the current map.
         */
        GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Circle(options);
            });
        };
        /**
         * Creates a google.map.Rectangle for the current map.
         */
        GoogleMapsAPIWrapper.prototype.createRectangle = function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Rectangle(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
            return this.getNativeMap().then(function (map) {
                var line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
            return this.getNativeMap().then(function (map) {
                var polygon = new google.maps.Polygon(options);
                polygon.setMap(map);
                return polygon;
            });
        };
        /**
         * Creates a new google.map.Data layer for the current map
         */
        GoogleMapsAPIWrapper.prototype.createDataLayer = function (options) {
            return this._map.then(function (m) {
                var data = new google.maps.Data(options);
                data.setMap(m);
                return data;
            });
        };
        /**
         * Determines if given coordinates are insite a Polygon path.
         */
        GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
            return google.maps.geometry.poly.containsLocation(latLng, polygon);
        };
        GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._map.then(function (m) {
                    m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.clearInstanceListeners = function () {
            this._map.then(function (map) {
                google.maps.event.clearInstanceListeners(map);
            });
        };
        GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
            return this._map.then(function (map) { return map.setCenter(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
        GoogleMapsAPIWrapper.prototype.getBounds = function () {
            return this._map.then(function (map) { return map.getBounds(); });
        };
        GoogleMapsAPIWrapper.prototype.getMapTypeId = function () {
            return this._map.then(function (map) { return map.getMapTypeId(); });
        };
        GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
            return this._map.then(function (map) { return map.setZoom(zoom); });
        };
        GoogleMapsAPIWrapper.prototype.getCenter = function () {
            return this._map.then(function (map) { return map.getCenter(); });
        };
        GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
            return this._map.then(function (map) { return map.panTo(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panBy = function (x, y) {
            return this._map.then(function (map) { return map.panBy(x, y); });
        };
        GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
            return this._map.then(function (map) { return map.fitBounds(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
            return this._map.then(function (map) { return map.panToBounds(latLng); });
        };
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         */
        GoogleMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
        /**
         * Triggers the given event name on the map instance.
         */
        GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
            return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
        };
        GoogleMapsAPIWrapper.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleMapsAPIWrapper.ctorParameters = function () { return [
            { type: MapsAPILoader },
            { type: core.NgZone }
        ]; };
        return GoogleMapsAPIWrapper;
    }());

    var MarkerManager = /** @class */ (function () {
        function MarkerManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markers = new Map();
        }
        MarkerManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var m = this._markers.get(marker);
            if (m == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return m.then(function (m) {
                return _this._zone.run(function () {
                    m.setMap(null);
                    _this._markers.delete(marker);
                });
            });
        };
        MarkerManager.prototype.updateMarkerPosition = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
        };
        MarkerManager.prototype.updateTitle = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
        };
        MarkerManager.prototype.updateLabel = function (marker) {
            return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
        };
        MarkerManager.prototype.updateDraggable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
        };
        MarkerManager.prototype.updateIcon = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
        };
        MarkerManager.prototype.updateOpacity = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
        };
        MarkerManager.prototype.updateVisible = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
        };
        MarkerManager.prototype.updateZIndex = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
        };
        MarkerManager.prototype.updateClickable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setClickable(marker.clickable); });
        };
        MarkerManager.prototype.updateAnimation = function (marker) {
            return this._markers.get(marker).then(function (m) {
                if (typeof marker.animation === 'string') {
                    m.setAnimation(google.maps.Animation[marker.animation]);
                }
                else {
                    m.setAnimation(marker.animation);
                }
            });
        };
        MarkerManager.prototype.addMarker = function (marker) {
            var markerPromise = this._mapsWrapper.createMarker({
                position: { lat: marker.latitude, lng: marker.longitude },
                label: marker.label,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
                animation: (typeof marker.animation === 'string') ? google.maps.Animation[marker.animation] : marker.animation
            });
            this._markers.set(marker, markerPromise);
        };
        MarkerManager.prototype.getNativeMarker = function (marker) {
            return this._markers.get(marker);
        };
        MarkerManager.prototype.createEventObservable = function (eventName, marker) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._markers.get(marker).then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        MarkerManager.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        MarkerManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return MarkerManager;
    }());

    var InfoWindowManager = /** @class */ (function () {
        function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markerManager = _markerManager;
            this._infoWindows = new Map();
        }
        InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
            var _this = this;
            var iWindow = this._infoWindows.get(infoWindow);
            if (iWindow == null) {
                // info window already deleted
                return Promise.resolve();
            }
            return iWindow.then(function (i) {
                return _this._zone.run(function () {
                    i.close();
                    _this._infoWindows.delete(infoWindow);
                });
            });
        };
        InfoWindowManager.prototype.setPosition = function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
                lat: infoWindow.latitude,
                lng: infoWindow.longitude
            }); });
        };
        InfoWindowManager.prototype.setZIndex = function (infoWindow) {
            return this._infoWindows.get(infoWindow)
                .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
        };
        InfoWindowManager.prototype.open = function (infoWindow) {
            var _this = this;
            return this._infoWindows.get(infoWindow).then(function (w) {
                if (infoWindow.hostMarker != null) {
                    return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                        return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                    });
                }
                return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
            });
        };
        InfoWindowManager.prototype.close = function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
        };
        InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
        };
        InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
            var options = {
                content: infoWindow.content,
                maxWidth: infoWindow.maxWidth,
                zIndex: infoWindow.zIndex,
                disableAutoPan: infoWindow.disableAutoPan
            };
            if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
                options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
            }
            var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
            this._infoWindows.set(infoWindow, infoWindowPromise);
        };
        /**
         * Creates a Google Maps event listener for the given InfoWindow as an Observable
         */
        InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._infoWindows.get(infoWindow).then(function (i) {
                    i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        InfoWindowManager.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        InfoWindowManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone },
            { type: MarkerManager }
        ]; };
        return InfoWindowManager;
    }());

    var infoWindowId = 0;
    /**
     * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .agm-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        <agm-info-window [disableAutoPan]="true">
     *          Hi, this is the content of the <strong>info window</strong>
     *        </agm-info-window>
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmInfoWindow = /** @class */ (function () {
        function AgmInfoWindow(_infoWindowManager, _el) {
            this._infoWindowManager = _infoWindowManager;
            this._el = _el;
            /**
             * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
             */
            this.isOpen = false;
            /**
             * Emits an event when the info window is closed.
             */
            this.infoWindowClose = new core.EventEmitter();
            this._infoWindowAddedToManager = false;
            this._id = (infoWindowId++).toString();
        }
        AgmInfoWindow.prototype.ngOnInit = function () {
            this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
            this._infoWindowManager.addInfoWindow(this);
            this._infoWindowAddedToManager = true;
            this._updateOpenState();
            this._registerEventListeners();
        };
        /** @internal */
        AgmInfoWindow.prototype.ngOnChanges = function (changes) {
            if (!this._infoWindowAddedToManager) {
                return;
            }
            if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
                typeof this.longitude === 'number') {
                this._infoWindowManager.setPosition(this);
            }
            if (changes['zIndex']) {
                this._infoWindowManager.setZIndex(this);
            }
            if (changes['isOpen']) {
                this._updateOpenState();
            }
            this._setInfoWindowOptions(changes);
        };
        AgmInfoWindow.prototype._registerEventListeners = function () {
            var _this = this;
            this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
                _this.isOpen = false;
                _this.infoWindowClose.emit();
            });
        };
        AgmInfoWindow.prototype._updateOpenState = function () {
            this.isOpen ? this.open() : this.close();
        };
        AgmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
            var options = {};
            var optionKeys = Object.keys(changes).filter(function (k) { return AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            this._infoWindowManager.setOptions(this, options);
        };
        /**
         * Opens the info window.
         */
        AgmInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
        /**
         * Closes the info window.
         */
        AgmInfoWindow.prototype.close = function () {
            var _this = this;
            return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
        };
        /** @internal */
        AgmInfoWindow.prototype.id = function () { return this._id; };
        /** @internal */
        AgmInfoWindow.prototype.toString = function () { return 'AgmInfoWindow-' + this._id.toString(); };
        /** @internal */
        AgmInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
        AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
        AgmInfoWindow.decorators = [
            { type: core.Component, args: [{
                        selector: 'agm-info-window',
                        template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        AgmInfoWindow.ctorParameters = function () { return [
            { type: InfoWindowManager },
            { type: core.ElementRef }
        ]; };
        AgmInfoWindow.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            disableAutoPan: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            maxWidth: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            infoWindowClose: [{ type: core.Output }]
        };
        return AgmInfoWindow;
    }());

    var markerId = 0;
    /**
     * AgmMarker renders a map marker inside a {@link AgmMap}.
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .agm-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMarker = /** @class */ (function () {
        function AgmMarker(_markerManager) {
            this._markerManager = _markerManager;
            /**
             * If true, the marker can be dragged. Default value is false.
             */
            // tslint:disable-next-line:no-input-rename
            this.draggable = false;
            /**
             * If true, the marker is visible
             */
            this.visible = true;
            /**
             * Whether to automatically open the child info window when the marker is clicked.
             */
            this.openInfoWindow = true;
            /**
             * The marker's opacity between 0.0 and 1.0.
             */
            this.opacity = 1;
            /**
             * All markers are displayed on the map in order of their zIndex, with higher values displaying in
             * front of markers with lower values. By default, markers are displayed according to their
             * vertical position on screen, with lower markers appearing in front of markers further up the
             * screen.
             */
            this.zIndex = 1;
            /**
             * If true, the marker can be clicked. Default value is true.
             */
            // tslint:disable-next-line:no-input-rename
            this.clickable = true;
            /**
             * This event emitter gets emitted when the user clicks on the marker.
             */
            this.markerClick = new core.EventEmitter();
            /**
             * This event is fired when the user rightclicks on the marker.
             */
            this.markerRightClick = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the marker.
             */
            this.dragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user mouses over the marker.
             */
            this.mouseOver = new core.EventEmitter();
            /**
             * This event is fired when the user mouses outside the marker.
             */
            this.mouseOut = new core.EventEmitter();
            /**
             * @internal
             */
            this.infoWindow = new core.QueryList();
            this._markerAddedToManger = false;
            this._observableSubscriptions = [];
            this._id = (markerId++).toString();
        }
        /* @internal */
        AgmMarker.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.handleInfoWindowUpdate();
            this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
        };
        AgmMarker.prototype.handleInfoWindowUpdate = function () {
            var _this = this;
            if (this.infoWindow.length > 1) {
                throw new Error('Expected no more than one info window.');
            }
            this.infoWindow.forEach(function (marker) {
                marker.hostMarker = _this;
            });
        };
        /** @internal */
        AgmMarker.prototype.ngOnChanges = function (changes) {
            if (typeof this.latitude === 'string') {
                this.latitude = Number(this.latitude);
            }
            if (typeof this.longitude === 'string') {
                this.longitude = Number(this.longitude);
            }
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            if (!this._markerAddedToManger) {
                this._markerManager.addMarker(this);
                this._markerAddedToManger = true;
                this._addEventListeners();
                return;
            }
            if (changes['latitude'] || changes['longitude']) {
                this._markerManager.updateMarkerPosition(this);
            }
            if (changes['title']) {
                this._markerManager.updateTitle(this);
            }
            if (changes['label']) {
                this._markerManager.updateLabel(this);
            }
            if (changes['draggable']) {
                this._markerManager.updateDraggable(this);
            }
            if (changes['iconUrl']) {
                this._markerManager.updateIcon(this);
            }
            if (changes['opacity']) {
                this._markerManager.updateOpacity(this);
            }
            if (changes['visible']) {
                this._markerManager.updateVisible(this);
            }
            if (changes['zIndex']) {
                this._markerManager.updateZIndex(this);
            }
            if (changes['clickable']) {
                this._markerManager.updateClickable(this);
            }
            if (changes['animation']) {
                this._markerManager.updateAnimation(this);
            }
        };
        AgmMarker.prototype._addEventListeners = function () {
            var _this = this;
            var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
                if (_this.openInfoWindow) {
                    _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
                }
                _this.markerClick.emit(null);
            });
            this._observableSubscriptions.push(cs);
            var rc = this._markerManager.createEventObservable('rightclick', this).subscribe(function () {
                _this.markerRightClick.emit(null);
            });
            this._observableSubscriptions.push(rc);
            var ds = this._markerManager.createEventObservable('dragend', this)
                .subscribe(function (e) {
                _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(ds);
            var mover = this._markerManager.createEventObservable('mouseover', this)
                .subscribe(function (e) {
                _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(mover);
            var mout = this._markerManager.createEventObservable('mouseout', this)
                .subscribe(function (e) {
                _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(mout);
        };
        /** @internal */
        AgmMarker.prototype.id = function () { return this._id; };
        /** @internal */
        AgmMarker.prototype.toString = function () { return 'AgmMarker-' + this._id.toString(); };
        /** @internal */
        AgmMarker.prototype.ngOnDestroy = function () {
            this._markerManager.deleteMarker(this);
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        AgmMarker.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-marker',
                        inputs: [
                            'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                            'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation'
                        ],
                        outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
                    },] },
        ];
        /** @nocollapse */
        AgmMarker.ctorParameters = function () { return [
            { type: MarkerManager }
        ]; };
        AgmMarker.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            title: [{ type: core.Input }],
            label: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['markerDraggable',] }],
            iconUrl: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            openInfoWindow: [{ type: core.Input }],
            opacity: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            clickable: [{ type: core.Input, args: ['markerClickable',] }],
            markerClick: [{ type: core.Output }],
            markerRightClick: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            mouseOver: [{ type: core.Output }],
            mouseOut: [{ type: core.Output }],
            infoWindow: [{ type: core.ContentChildren, args: [AgmInfoWindow,] }]
        };
        return AgmMarker;
    }());

    var __extends = (window && window.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
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
            return new rxjs.Observable(function (observer) {
                _this._markers.get(marker).then(function (m) {
                    google.maps.event.addListener(m, eventName, function (e) {
                        e.latLng = m.getPosition();
                        _this._zone.run(function () { return observer.next(e); });
                    });
                });
            });
        };
        MarkerWithLabelManager.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        MarkerWithLabelManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return MarkerWithLabelManager;
    }(MarkerManager));

    var __extends$1 = (window && window.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var AgmMarkerWithLabel = /** @class */ (function (_super) {
        __extends$1(AgmMarkerWithLabel, _super);
        function AgmMarkerWithLabel(_markerWithLabelManager) {
            var _this = _super.call(this, _markerWithLabelManager) || this;
            _this._markerWithLabelManager = _markerWithLabelManager;
            return _this;
        }
        AgmMarkerWithLabel.prototype.ngOnChanges = function (changes) {
            _super.prototype.ngOnChanges.call(this, changes);
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            if (changes['labelContent']) {
                this._markerWithLabelManager.updateLabelContent(this);
            }
            if (changes['labelClass']) {
                this._markerWithLabelManager.updateLabelClass(this);
            }
        };
        AgmMarkerWithLabel.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-marker-with-label',
                        inputs: [
                            'latitude', 'longitude', 'title', 'draggable: markerDraggable', 'iconUrl',
                            'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation',
                            'labelContent', 'labelAnchor', 'labelClass', 'labelInBackground'
                        ],
                        providers: [
                            MarkerWithLabelManager,
                            { provide: MarkerManager, useExisting: MarkerWithLabelManager },
                            InfoWindowManager
                        ]
                    },] },
        ];
        /** @nocollapse */
        AgmMarkerWithLabel.ctorParameters = function () { return [
            { type: MarkerWithLabelManager }
        ]; };
        AgmMarkerWithLabel.propDecorators = {
            labelContent: [{ type: core.Input }],
            labelAnchor: [{ type: core.Input }],
            labelClass: [{ type: core.Input }],
            labelInBackground: [{ type: core.Input }]
        };
        return AgmMarkerWithLabel;
    }(AgmMarker));

    var AgmMarkerWithLabelModule = /** @class */ (function () {
        function AgmMarkerWithLabelModule() {
        }
        AgmMarkerWithLabelModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.AgmCoreModule],
                        exports: [AgmMarkerWithLabel],
                        declarations: [AgmMarkerWithLabel]
                    },] },
        ];
        return AgmMarkerWithLabelModule;
    }());

    // main modules

    exports.AgmMarkerWithLabelModule = AgmMarkerWithLabelModule;
    exports.AgmMarkerWithLabel = AgmMarkerWithLabel;
    exports.MarkerWithLabelManager = MarkerWithLabelManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
