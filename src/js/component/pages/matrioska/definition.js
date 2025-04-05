//@ts-check

import { MobCore } from '../../../mob/mobCore';
import { MobJs } from '../../../mob/mobjs';
import { DynamicListButton } from '../dynamicList/button/definition';
import { MatrioskaFn } from './matrioska';
import { MatrioskaItem } from './matrioskaItem/definition';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

/**
 * @param {Array<{key:number, value:string}>} array
 * @returns {Array<{key:number, value:string}>}
 */
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const Matrioska = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').Matrioska>} */
    ({
        name: 'page-matrioska',
        component: MatrioskaFn,
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
    })
);
