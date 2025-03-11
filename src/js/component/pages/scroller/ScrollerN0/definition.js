//@ts-check

import { MobJs } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { ScrollerN0Fn } from './scrollerN0';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const ScrollerN0 = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').ScrollerN0>} */
    ({
        name: 'scroller-n0',
        component: ScrollerN0Fn,
        exportState: [
            'numberOfRow',
            'numberOfColumn',
            'cellWidth',
            'cellHeight',
            'gutter',
            'fill',
            'stagger',
            'reorder',
            'disableOffcanvas',
        ],
        state: {
            isMounted: false,
            numberOfRow: () => ({
                value: 10,
                type: Number,
            }),
            numberOfColumn: () => ({
                value: 10,
                type: Number,
            }),
            cellWidth: () => ({
                value: 65,
                type: Number,
            }),
            cellHeight: () => ({
                value: 65,
                type: Number,
            }),
            gutter: () => ({
                value: 1,
                type: Number,
            }),
            fill: () => ({
                value: [
                    36, 37, 38, 39, 40, 47, 51, 58, 62, 69, 73, 80, 81, 82, 83,
                    84,
                ],
                type: Array,
            }),
            stagger: () => ({
                value: {
                    type: 'equal',
                    each: 6,
                    from: 'random',
                },
                type: 'Any',
            }),
            reorder: () => ({
                value: true,
                type: Boolean,
            }),
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
        },
    })
);
