//@ts-check

import { mobCore } from '../../../mobCore';
import { createComponent } from '../../../mobjs';
import { OnlyDesktop } from '../../common/onlyDesktop/definition';
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
            validate: (val) => val.length <= 10,
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
            validate: (val) => val.length <= 10,
            strict: true,
        }),
    },
    child: [DynamicListButton, OnlyDesktop, MatrioskaItem],
});
