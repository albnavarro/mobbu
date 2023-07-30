import { createComponentDefinition } from '../../../mobjs';
import { HorizontalScroller } from './horizontalScroller';

export const horizontalScrollerDef = createComponentDefinition({
    name: 'HorizontalScroller',
    component: HorizontalScroller,
    state: {
        animatePin: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
