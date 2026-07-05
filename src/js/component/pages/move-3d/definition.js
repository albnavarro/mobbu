//@ts-check

import { MobJs } from '@mobJs';
import { Move3DPageFunction } from './move-3d-page';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Move3DPage = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Move3DPage>} */
    ({
        tag: 'move-3d-page',
        component: Move3DPageFunction,
        props: {
            data: {
                __value: [],
                __type: Array,
            },
            drag: {
                __value: true,
                __type: Boolean,
            },
        },
        state: {
            xDepth: {
                __value: 20,
                __type: Number,
            },
            yDepth: {
                __value: 20,
                __type: Number,
            },
            xLimit: {
                __value: 1000,
                __type: Number,
            },
            yLimit: {
                __value: 1000,
                __type: Number,
            },
            perspective: {
                __value: 700,
                __type: Number,
            },
            debug: {
                __value: false,
                __type: Boolean,
            },
            factor: {
                __value: 45,
                __type: Number,
                __validate: (value) => {
                    return value > 1;
                },
                __strict: true,
            },
            controlsActive: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
