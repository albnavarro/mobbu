//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
import { AnimatedPatternN0Fn } from './animated-pattern-n0';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AnimatedPatternN0 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimatedPatternN0>} */
    ({
        tag: 'animatedpattern-n0',
        component: AnimatedPatternN0Fn,
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
                value: window.innerHeight / 16,
                type: Number,
            }),
            cellHeight: () => ({
                value: window.innerHeight / 16,
                type: Number,
            }),
            gutter: () => ({
                value: 1,
                type: Number,
            }),
            fill: () => ({
                value: [16, 27, 38, 49, 60, 71, 82, 93],
                type: Array,
            }),
            stagger: () => ({
                value: {
                    each: 5,
                    grid: { col: 11, row: 11, direction: 'row' },
                    waitComplete: false,
                },
                type: 'any',
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
