import { createComponent } from '../../../mobjs';
import { Mlogo1Fn } from './mLogo1';

export const MLogo1 = createComponent({
    name: 'm-logo-1',
    component: Mlogo1Fn,
    exportState: ['svg', 'active'],
    state: {
        svg: () => ({
            value: '',
            type: String,
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
