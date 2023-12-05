import { createComponent } from '../../../../mobjs';
import { List } from './list';

export const listContentDef = createComponent({
    name: 'mob-list',
    component: List,
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
            value: 'grey',
            type: String,
            validate: (val) => {
                return ['white', 'grey', 'green'].includes(val);
            },
        }),
        items: () => ({
            value: [],
            type: Array,
        }),
    },
});
