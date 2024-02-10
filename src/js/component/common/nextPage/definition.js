import { createComponent } from '../../../mobjs';
import { QuickNav } from './nextPage';

export const quickNavDef = createComponent({
    name: 'quick-nav',
    component: QuickNav,
    exportState: ['active', 'prevRoute', 'nextRoute'],
    state: {
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
