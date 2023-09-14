import { createComponent } from '../../../mobjs';
import { PageTransition } from './pageTransition';

export const pageTransitionComponentDef = createComponent({
    name: 'page-transition',
    component: PageTransition,
    isolateOnMount: true,
    isolateCreation: true,
    exportState: ['url'],
    state: {
        url: () => ({
            value: '',
            type: String,
        }),
    },
});
