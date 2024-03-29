import { createComponent } from '../../../mobjs';
import { Mlogo1 } from './mLogo1';

export const mLogo1SvgDef = createComponent({
    name: 'm-logo-1',
    component: Mlogo1,
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
