//@ts-check

import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { AnimatedPatternN1Fn } from './animatedPatternN1';

export const AnimatedPatternN1 = createComponent({
    name: 'animatedpattern-n1',
    component: AnimatedPatternN1Fn,
    exportState: [
        'numberOfRow',
        'numberOfColumn',
        'cellWidth',
        'cellHeight',
        'gutter',
        'fill',
        'disableOffcanvas',
    ],
    state: {
        numberOfRow: 7,
        numberOfColumn: 15,
        cellWidth: 70,
        cellHeight: 70,
        gutter: 10,
        fill: [
            2, 18, 10, 27, 21, 22, 23, 24, 25, 25, 26, 37, 42, 53, 58, 69, 74,
            85, 86, 87, 88, 89, 90, 44, 60, 65, 66,
        ],
        disableOffcanvas: () => ({
            value: detectFirefox() || detectSafari() ? true : false,
            type: Boolean,
        }),
    },
    child: [OnlyDesktop],
});
