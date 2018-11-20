import { NgZone } from '@angular/core';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AgmMarkerWithLabel } from '../../directives/marker-with-label';
import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { Observable } from 'rxjs';
export declare class MarkerWithLabelManager extends MarkerManager {
    protected _mapsWrapper: GoogleMapsAPIWrapper;
    protected _zone: NgZone;
    private _markerInstance;
    constructor(_mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    addMarker(marker: AgmMarkerWithLabel): void;
    updateLabelContent(marker: AgmMarkerWithLabel): Promise<void>;
    updateLabelClass(marker: AgmMarkerWithLabel): Promise<void>;
    createEventObservable<T>(eventName: string, marker: AgmMarkerWithLabel): Observable<T>;
}
