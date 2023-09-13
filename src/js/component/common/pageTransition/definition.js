import { createComponent } from '../../../mobjs';
import { PageTransition } from './pageTransition';

export const pageTransitionComponentDef = createComponent({
    name: 'PageTransition',
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
