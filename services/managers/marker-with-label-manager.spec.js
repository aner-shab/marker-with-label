import { NgZone } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
import { MarkerWithLabelManager } from './marker-with-label-manager';
import { AgmMarkerWithLabel } from '../../directives/marker-with-label';
window.google = {
    maps: {}
};
describe('MarkerWithLabelManager', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: function () { return new NgZone({ enableLongStackTrace: true }); } },
                MarkerWithLabelManager, {
                    provide: GoogleMapsAPIWrapper,
                    useValue: {
                        getNativeMap: jest.fn().mockImplementation(function () { return Promise.resolve({}); }),
                        createMarker: jest.fn()
                    }
                }
            ]
        });
    });
    describe('Create a new marker', function () {
        it('should create new marker with label', inject([MarkerWithLabelManager, GoogleMapsAPIWrapper], function (markerWithLabelManager, apiWrapper) {
            var newMarker = new AgmMarkerWithLabel(markerWithLabelManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.labelContent = 'A';
            newMarker.labelClass = 'my-label';
            markerWithLabelManager.addMarker(newMarker);
            markerWithLabelManager.getNativeMarker(newMarker).then(function (nativeMarker) {
                expect(nativeMarker.labelContent).toEqual('A');
            });
        }));
    });
    describe('Update label content', function () {
        it('Should update label content', inject([MarkerWithLabelManager, GoogleMapsAPIWrapper], function (markerWithLabelManager, apiWrapper) {
            var newMarker = new AgmMarkerWithLabel(markerWithLabelManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.labelContent = 'A';
            newMarker.labelClass = 'my-label';
            markerWithLabelManager.addMarker(newMarker);
            newMarker.labelContent = 'B';
            markerWithLabelManager.updateLabelContent(newMarker);
            markerWithLabelManager.getNativeMarker(newMarker).then(function (nativeMarker) {
                expect(nativeMarker.labelContent).toEqual('B');
            });
        }));
    });
    describe('Update label class', function () {
        it('Should update label class', inject([MarkerWithLabelManager, GoogleMapsAPIWrapper], function (markerWithLabelManager, apiWrapper) {
            var newMarker = new AgmMarkerWithLabel(markerWithLabelManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.labelContent = 'A';
            newMarker.labelClass = 'my-label';
            markerWithLabelManager.addMarker(newMarker);
            newMarker.labelClass = 'your-label';
            markerWithLabelManager.updateLabelClass(newMarker);
            markerWithLabelManager.getNativeMarker(newMarker).then(function (nativeMarker) {
                expect(nativeMarker.labelClass).toEqual('your-label');
            });
        }));
    });
});
//# sourceMappingURL=marker-with-label-manager.spec.js.map