import { createComponentDefinition } from '../../../mobjs';
import { HorizontalScroller } from './horizontalScroller';

export const horizontalScrollerDef = createComponentDefinition({
    name: 'HorizontalScroller',
    component: HorizontalScroller,
    state: {
        currentId: () => ({
            id: -1,
            type: Number,
        }),
        currentIdFromScroll: () => ({
            id: -1,
            type: Number,
        }),
        animatePin: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
