import { createComponentDefinition } from '../../../mobjs';
import { PageTransition } from './pageTransition';

export const pageTransitionComponentDef = createComponentDefinition({
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
