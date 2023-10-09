import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN1 } from './caterpillarN1';

export const caterpillarN1Def = createComponent({
    name: 'caterpillar-n1',
    component: CaterpillarN1,
    isolateCreation: true,
    isolateOnMount: true,
    exportState: [
        'numItems',
        'width',
        'height',
        'fill',
        'opacity',
        'radius',
        'rotationEach',
        'centerEach',
        'rotationDuration',
        'disableOffcanvas',
    ],
    state: {
        numItems: 20,
        width: 40,
        height: 40,
        fill: [14],
        opacity: 0.05,
        radius: 0,
        rotationEach: 15,
        centerEach: 3,
        rotationDuration: 5000,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
