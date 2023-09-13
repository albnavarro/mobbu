import { createComponent } from '../../../mobjs';
import { HorizontalScroller } from './horizontalScroller';

export const horizontalScrollerDef = createComponent({
    name: 'HorizontalScroller',
    component: HorizontalScroller,
    isolateOnMount: true,
    isolateCreation: true,
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
