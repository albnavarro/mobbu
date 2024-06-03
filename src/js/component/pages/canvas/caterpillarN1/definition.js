import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { CaterpillarN1Fn } from './caterpillarN1';

export const CaterpillarN1 = createComponent({
    name: 'caterpillar-n1',
    component: CaterpillarN1Fn,
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
    child: [OnlyDesktop],
});
