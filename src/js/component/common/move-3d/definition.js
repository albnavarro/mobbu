import { MobJs } from '@mobJs';
import { Move3Dfn } from './move-3d';
import { Move3DItem } from './move-3d-item/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const Move3D = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Move3D>} */
    ({
        name: 'move-3d',
        component: Move3Dfn,
        exportState: [
            'drag',
            'centerToViewoport',
            'xDepth',
            'yDepth',
            'xLimit',
            'yLimit',
            'factor',
            'shape',
            'debug',
            'perspective',
            'afterInit',
            'onUpdate',
        ],
        state: {
            drag: () => ({
                value: false,
                type: Boolean,
            }),
            centerToViewoport: () => ({
                value: false,
                type: Boolean,
            }),
            useScroll: () => ({
                value: true,
                type: Boolean,
            }),
            perspective: () => ({
                value: 700,
                type: Number,
            }),
            xDepth: () => ({
                value: 20,
                type: Number,
                validate: (value) => {
                    return value > 1;
                },
                strict: true,
            }),
            yDepth: () => ({
                value: 20,
                type: Number,
                validate: (value) => {
                    return value > 1;
                },
                strict: true,
            }),
            xLimit: () => ({
                value: 10_000,
                type: Number,
            }),
            yLimit: () => ({
                value: 10_000,
                type: Number,
            }),
            factor: () => ({
                value: 45,
                type: Number,
                validate: (value) => {
                    return value > 1;
                },
                strict: true,
            }),
            shape: () => ({
                value: [],
                type: Array,
            }),
            debug: () => ({
                value: false,
                type: Boolean,
            }),
            afterInit: () => ({
                value: () => {},
                type: Function,
            }),
            onUpdate: () => ({
                value: () => {},
                type: Function,
            }),
        },
        child: [Move3DItem],
    })
);
