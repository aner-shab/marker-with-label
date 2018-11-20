import { NgModule } from '@angular/core';
import { AgmMarkerWithLabel } from './directives/marker-with-label';
import { AgmCoreModule } from '@agm/core';
var AgmMarkerWithLabelModule = /** @class */ (function () {
    function AgmMarkerWithLabelModule() {
    }
    AgmMarkerWithLabelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AgmCoreModule],
                    exports: [AgmMarkerWithLabel],
                    declarations: [AgmMarkerWithLabel]
                },] },
    ];
    return AgmMarkerWithLabelModule;
}());
export { AgmMarkerWithLabelModule };
//# sourceMappingURL=marker-with-label.module.js.map
