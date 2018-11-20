import { SimpleChange, OnChanges } from '@angular/core';
import { AgmMarker } from '@agm/core/directives/marker';
import { MarkerWithLabelManager } from '../services/managers/marker-with-label-manager';
import { Point } from '@agm/core/services/google-maps-types';
export declare class AgmMarkerWithLabel extends AgmMarker implements OnChanges {
    private _markerWithLabelManager;
    /**
     * Label content (text or HTML Node)
     */
    labelContent: string;
    /**
     * Label position
     */
    labelAnchor: Point;
    /**
     * Class name for label element
     */
    labelClass: string;
    /**
     * Draw label in background/foreground of its marker
     */
    labelInBackground: boolean;
    constructor(_markerWithLabelManager: MarkerWithLabelManager);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
