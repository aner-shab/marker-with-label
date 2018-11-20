import { Marker, LatLng } from '@ajqua/core/services/google-maps-types';
export interface MarkerWithLabel extends Marker {
    setOptions(options: any): void;
    getPosition(): LatLng;
}
