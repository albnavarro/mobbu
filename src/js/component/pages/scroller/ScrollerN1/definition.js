import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { ScrollerN1 } from './caterpillarN3';

export const scrollerN1Def = createComponent({
    name: 'caterpillar-n3',
    component: ScrollerN1,
    isolateOnMount: true,
    isolateCreation: true,
    exportState: [
        'amountOfPath',
        'width',
        'height',
        'radius',
        'fill',
        'stroke',
        'opacity',
        'intialRotation',
        'disableOffcanvas',
    ],
    state: {
        amountOfPath: 17,
        width: 30,
        height: 30,
        radius: 100,
        fill: '',
        stroke: '#fff',
        opacity: 0.05,
        intialRotation: 33,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
