import { MobJs } from '@mobJs';
import { Move3Dfn } from './move-3d';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Move3D = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Move3DType>} */
    ({
        tag: 'move-3d',
        component: Move3Dfn,
        props: {
            drag: {
                __value: false,
                __type: Boolean,
            },
            centerToViewoport: {
                __value: false,
                __type: Boolean,
            },
            perspective: {
                __value: 700,
                __type: Number,
            },
            xDepth: {
                __value: 20,
                __type: Number,
                __validate: (value) => {
                    return value > 1;
                },
                __strict: true,
            },
            yDepth: {
                __value: 20,
                __type: Number,
                __validate: (value) => {
                    return value > 1;
                },
                __strict: true,
            },
            xLimit: {
                __value: 10_000,
                __type: Number,
            },
            yLimit: {
                __value: 10_000,
                __type: Number,
            },
            factor: {
                __value: 45,
                __type: Number,
                __validate: (value) => {
                    return value > 1;
                },
                __strict: true,
            },
            shape: {
                __value: [],
                __type: Array,
            },
            debug: {
                __value: false,
                __type: Boolean,
            },
            afterInit: {
                __value: () => {},
                __type: Function,
            },
            onUpdate: {
                __value: () => {},
                __type: Function,
            },
        },
        state: {
            useScroll: {
                __value: true,
                __type: Boolean,
            },
        },
    })
);
