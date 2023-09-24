import { createComponent } from '../../../mobjs';
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
            value: [
                {
                    key: 'a',
                    label: 'A',
                },
                {
                    key: 'b',
                    label: 'B',
                },
            ],
            type: Array,
        }),
        activeSample: () => ({
            value: -1,
            type: Number,
        }),
    },
});
