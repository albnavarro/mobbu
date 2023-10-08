import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { ScrollerN1 } from './scrollerN1';

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
        'opacity',
        'intialRotation',
        'endRotation',
        'disableOffcanvas',
    ],
    state: {
        amountOfPath: 17,
        width: 10,
        height: 30,
        radius: 20,
        opacity: 0.05,
        intialRotation: 33,
        endRotation: 720,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
