//@ts-check

import { MobJs } from '@mobJs';
import { Move3DPagefn } from './move-3d-page';
import { Move3D } from '@commonComponent/move-3d/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Move3DPage = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Move3DPage>} */
    ({
        tag: 'move-3d-page',
        component: Move3DPagefn,
        props: {
            data: () => ({
                value: [],
                type: Array,
            }),
            drag: () => ({
                value: true,
                type: Boolean,
            }),
        },
        state: {
            xDepth: () => ({
                value: 20,
                type: Number,
            }),
            yDepth: () => ({
                value: 20,
                type: Number,
            }),
            xLimit: () => ({
                value: 1000,
                type: Number,
            }),
            yLimit: () => ({
                value: 1000,
                type: Number,
            }),
            perspective: () => ({
                value: 700,
                type: Number,
            }),
            debug: () => ({
                value: false,
                type: Boolean,
            }),
            factor: () => ({
                value: 45,
                type: Number,
                validate: (value) => {
                    return value > 1;
                },
                strict: true,
            }),
            controlsActive: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [Move3D],
    })
);
