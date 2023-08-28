import { createComponentDefinition } from '../../../mobjs';
import { HorizontalScroller } from './horizontalScroller';

export const horizontalScrollerDef = createComponentDefinition({
    name: 'HorizontalScroller',
    component: HorizontalScroller,
    asyncLoading: true,
    exportState: ['currentId', 'currentIdFromScroll', 'animatePin'],
    state: {
        currentId: () => ({
            value: 0,
            type: Number,
        }),
        currentIdFromScroll: () => ({
            value: 0,
            type: Number,
        }),
        animatePin: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
