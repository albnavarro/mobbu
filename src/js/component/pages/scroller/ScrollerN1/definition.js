import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { ScrollerN1 } from './scrollerN1';

export const scrollerN1Def = createComponent({
    name: 'scroller-n1',
    component: ScrollerN1,
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
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
    child: [OnlyDesktop],
});
