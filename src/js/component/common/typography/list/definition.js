//@ts-check

import { createComponent } from '../../../../mobjs';
import { ListFn } from './list';

export const List = createComponent({
    name: 'mob-list',
    component: ListFn,
    exportState: ['style', 'color', 'items', 'dots'],
    state: {
        style: () => ({
            value: 'medium',
            type: String,
            validate: (val) => ['small', 'medium', 'big'].includes(val),
            strict: true,
        }),
        dots: () => ({
            value: true,
            type: Boolean,
        }),
        color: () => ({
            value: 'black',
            type: String,
            validate: (val) => {
                return ['white', 'black', 'grey', 'hightlight'].includes(val);
            },
        }),
        items: () => ({
            value: [],
            type: Array,
        }),
    },
});
