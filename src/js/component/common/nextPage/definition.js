import { createComponent } from '../../../mobjs';
import { QuickNav } from './nextPage';

export const quickNavDef = createComponent({
    name: 'quick-nav',
    component: QuickNav,
    exportState: ['prevRoute', 'nextRoute'],
    state: {
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
