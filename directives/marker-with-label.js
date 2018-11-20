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
import { Directive, Input } from '@angular/core';
import { AgmMarker } from '@agm/core/directives/marker';
import { InfoWindowManager } from '@agm/core/services/managers/info-window-manager';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { MarkerWithLabelManager } from '../services/managers/marker-with-label-manager';
var AgmMarkerWithLabel = /** @class */ (function (_super) {
    __extends(AgmMarkerWithLabel, _super);
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
        { type: Directive, args: [{
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
        labelContent: [{ type: Input }],
        labelAnchor: [{ type: Input }],
        labelClass: [{ type: Input }],
        labelInBackground: [{ type: Input }]
    };
    return AgmMarkerWithLabel;
}(AgmMarker));
export { AgmMarkerWithLabel };
//# sourceMappingURL=marker-with-label.js.map
