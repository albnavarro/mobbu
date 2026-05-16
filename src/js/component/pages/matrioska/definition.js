//@ts-check

import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MatrioskaRepeatFn } from './matrioska-repeat';
import { MatrioskaInvalidateFn } from './matrioska-invalidate';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

/**
 * @param {{ key: number; value: string }[]} array
 * @returns {{ key: number; value: string }[]}
 */
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/** @type {Partial<CreateComponentParams<import('./type').Matrioska>>} */
const commonParams = {
    state: {
        level1: {
            __value: [{ key: 1, value: MobCore.getUnivoqueId() }],
            __type: Array,
            __validate: (val) => val.length <= 10,
            __strict: true,
        },
        level2: {
            __value: [
                { key: 1, value: MobCore.getUnivoqueId() },
                { key: 2, value: MobCore.getUnivoqueId() },
            ],
            __type: Array,
            __validate: (val) => val.length <= 10,
            __strict: true,
        },
        level3: {
            __value: [
                { key: 1, value: MobCore.getUnivoqueId() },
                { key: 2, value: MobCore.getUnivoqueId() },
            ],
            __type: Array,
            __transform: (val, oldVal) => {
                return val > oldVal ? shuffle(val) : val;
            },
            __validate: (val) => val.length <= 6,
            __strict: true,
        },
        counter: {
            __value: 0,
            __type: Number,
        },
    },
};

export const MatrioskaRepeat = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Matrioska>} */
    ({
        tag: 'page-matrioska-repeat',
        component: MatrioskaRepeatFn,
        ...commonParams,
    })
);

export const MatrioskaInvalidate = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Matrioska>} */
    ({
        tag: 'page-matrioska-invalidate',
        component: MatrioskaInvalidateFn,
        ...commonParams,
    })
);
