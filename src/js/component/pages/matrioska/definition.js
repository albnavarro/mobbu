//@ts-check

import { mobCore } from '../../../mobCore';
import { createComponent } from '../../../mobjs';
import { DynamicListButton } from '../dynamicList/button/definition';
import { MatrioskaFn } from './matrioska';
import { MatrioskaItem } from './matrioskaItem/definition';

export const Matrioska = createComponent({
    name: 'page-matrioska',
    component: MatrioskaFn,
    exportState: [],
    state: {
        level1: () => ({
            value: [{ key: 1, value: mobCore.getUnivoqueId() }],
            type: Array,
        }),
        level2: () => ({
            value: [
                { key: 1, value: mobCore.getUnivoqueId() },
                { key: 1, value: mobCore.getUnivoqueId() },
            ],
            type: Array,
        }),
        level3: () => ({
            value: [
                { key: 1, value: mobCore.getUnivoqueId() },
                { key: 1, value: mobCore.getUnivoqueId() },
            ],
            type: Array,
        }),
    },
    child: [DynamicListButton, MatrioskaItem],
});
