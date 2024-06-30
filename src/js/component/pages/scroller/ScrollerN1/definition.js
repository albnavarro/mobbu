//@ts-check

import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { ScrollerN1Fn } from './scrollerN1';

export const ScrollerN1 = createComponent({
    name: 'scroller-n1',
    component: ScrollerN1Fn,
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
        width: 15,
        height: 40,
        radius: 0,
        opacity: 0.05,
        intialRotation: 33,
        endRotation: 720,
        disableOffcanvas: () => ({
            value: detectFirefox() || detectSafari() ? true : false,
            type: Boolean,
        }),
    },
    child: [OnlyDesktop],
});
