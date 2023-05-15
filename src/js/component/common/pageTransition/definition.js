import { createComponentDefinition } from '../../../mobjs';
import { PageTransition } from './pageTransition';

export const pageTransitionComponentDef = createComponentDefinition({
    name: 'PageTransition',
    component: PageTransition,
    state: {
        url: () => ({
            value: () => {},
            type: String,
        }),
    },
});
