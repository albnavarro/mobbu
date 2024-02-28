import { createComponent } from '../../../mobjs';
import { QuickNav } from './nextPage';

export const quickNavDef = createComponent({
    name: 'quick-nav',
    component: QuickNav,
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
