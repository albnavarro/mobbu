import { createComponent } from '../../../mobjs';
import { PageTransition } from './pageTransition';

export const pageTransitionComponentDef = createComponent({
    name: 'PageTransition',
    component: PageTransition,
    asyncLoading: true,
    exportState: ['url'],
    state: {
        url: () => ({
            value: '',
            type: String,
        }),
    },
});
