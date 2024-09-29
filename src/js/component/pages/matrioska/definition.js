//@ts-check

import { mobCore } from '../../../mobCore';
import { createComponent } from '../../../mobjs';
import { OnlyDesktop } from '../../common/onlyDesktop/definition';
import { DynamicListButton } from '../dynamicList/button/definition';
import { MatrioskaFn } from './matrioska';
import { MatrioskaItem } from './matrioskaItem/definition';

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

export const Matrioska = createComponent({
    name: 'page-matrioska',
    component: MatrioskaFn,
    exportState: [],
    state: {
        level1: () => ({
            value: [{ key: 1, value: mobCore.getUnivoqueId() }],
            type: Array,
            validate: (val) => val.length <= 5,
            strict: true,
        }),
        level2: () => ({
            value: [
                { key: 1, value: mobCore.getUnivoqueId() },
                { key: 2, value: mobCore.getUnivoqueId() },
            ],
            type: Array,
            validate: (val) => val.length <= 10,
            strict: true,
        }),
        level3: () => ({
            value: [
                { key: 1, value: mobCore.getUnivoqueId() },
                { key: 2, value: mobCore.getUnivoqueId() },
            ],
            type: Array,
            transform: (val, oldVal) => {
                return val > oldVal ? shuffle(val) : val;
            },
            validate: (val) => val.length <= 10,
            strict: true,
        }),
    },
    child: [DynamicListButton, OnlyDesktop, MatrioskaItem],
});
