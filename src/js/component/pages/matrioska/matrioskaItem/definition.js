//@ts-check

import { createComponent } from '../../../../mobjs';
import { MatrioskaItemFn } from './matrioskaItem';

export const MatrioskaItem = createComponent({
    name: 'matrioska-item',
    component: MatrioskaItemFn,
    exportState: ['level', 'key', 'value'],
    state: {
        level: () => ({
            value: '',
            type: String,
        }),
        key: () => ({
            value: '',
            type: String,
        }),
        value: () => ({
            value: '',
            type: String,
        }),
    },
    child: [],
});
