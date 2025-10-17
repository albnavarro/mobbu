//@ts-check

import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { DynamicListButton } from '../dynamic-list/button/definition';
import { MatrioskaRepeatFn } from './matrioska-repeat';
import { MatrioskaItem } from './item/definition';
import { MatrioskaInvalidateFn } from './matrioska-invalidate';

/**
 * @import {CreateComponentParams} from "@mobJsType";
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
    exportState: [],
    state: {
        level1: () => ({
            value: [{ key: 1, value: MobCore.getUnivoqueId() }],
            type: Array,
            validate: (val) => val.length <= 10,
            strict: true,
        }),
        level2: () => ({
            value: [
                { key: 1, value: MobCore.getUnivoqueId() },
                { key: 2, value: MobCore.getUnivoqueId() },
            ],
            type: Array,
            validate: (val) => val.length <= 10,
            strict: true,
        }),
        level3: () => ({
            value: [
                { key: 1, value: MobCore.getUnivoqueId() },
                { key: 2, value: MobCore.getUnivoqueId() },
            ],
            type: Array,
            transform: (val, oldVal) => {
                return val > oldVal ? shuffle(val) : val;
            },
            validate: (val) => val.length <= 6,
            strict: true,
        }),
        counter: () => ({
            value: 0,
            type: Number,
        }),
    },
    child: [DynamicListButton, MatrioskaItem],
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
