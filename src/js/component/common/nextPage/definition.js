import { createComponent } from '../../../mobjs';
import { QuickNavFn } from './nextPage';

export const QuickNav = createComponent({
    name: 'quick-nav',
    component: QuickNavFn,
    exportState: ['color', 'active', 'prevRoute', 'nextRoute'],
    state: {
        color: () => ({
            value: 'white',
            type: String,
            validate: (value) => {
                return ['white', 'black'].includes(value);
            },
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
        prevRoute: () => ({
            value: '',
            type: String,
        }),
        nextRoute: () => ({
            value: '',
            type: String,
        }),
    },
});
