//@ts-check

import { createComponent } from '../../../../mobjs';
import { MatrioskaItemFn } from './matrioskaItem';

export const MatrioskaItem = createComponent({
    name: 'matrioska-item',
    component: MatrioskaItemFn,
    exportState: ['level', 'key', 'value', 'active', 'counter', 'index'],
    state: {
        level: () => ({
            value: '',
            type: String,
        }),
        key: () => ({
            value: '',
            strict: true,
            type: String,
        }),
        index: () => ({
            value: 0,
            strict: true,
            type: Number,
        }),
        value: () => ({
            value: '',
            type: String,
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
        counter: () => ({
            value: -1,
            type: Number,
        }),
    },
    child: [],
});
