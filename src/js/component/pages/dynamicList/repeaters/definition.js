import { createComponent } from '../../../../mobjs';
import { DynamicListRepeater } from './dynamicListRepeater';

export const dynamicListRepeaterDef = createComponent({
    name: 'dynamic-list-repeater',
    component: DynamicListRepeater,
    exportState: [
        'label',
        'clean',
        'data',
        'listId',
        'key',
        'listId',
        'counter',
    ],
    state: {
        data: () => ({
            value: [],
            type: Array,
        }),
        key: () => ({
            value: '',
            type: String,
        }),
        clean: () => ({
            value: false,
            type: Boolean,
        }),
        listId: () => ({
            value: -1,
            type: Number,
        }),
        counter: () => ({
            value: -1,
            type: Number,
        }),
        label: () => ({
            value: '',
            type: String,
        }),
    },
});
