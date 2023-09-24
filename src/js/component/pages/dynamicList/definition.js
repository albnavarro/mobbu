import { createComponent } from '../../../mobjs';
import { startData } from './data';
import { DynamicList } from './dynamicList';

export const dynamicListDef = createComponent({
    name: 'dynamic-list',
    component: DynamicList,
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: startData,
            type: Array,
        }),
        activeSample: () => ({
            value: 3,
            type: Number,
        }),
    },
});
