import { createComponent } from '../../../../mobjs';
import { List } from './list';

export const listContentDef = createComponent({
    name: 'mob-list',
    component: List,
    exportState: ['style', 'color', 'items'],
    state: {
        style: () => ({
            value: 'medium',
            type: String,
            validate: (val) => ['small', 'medium', 'big'].includes(val),
            strict: true,
        }),
        color: () => ({
            value: 'white',
            type: String,
            validate: (val) => {
                return ['white', 'green'].includes(val);
            },
        }),
        items: () => ({
            value: [],
            type: Array,
        }),
    },
});
