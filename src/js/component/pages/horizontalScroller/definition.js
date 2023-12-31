import { createComponent } from '../../../mobjs';
import { HorizontalScroller } from './horizontalScroller';

export const horizontalScrollerDef = createComponent({
    name: 'horizontal-scroller',
    component: HorizontalScroller,
    isolateOnMount: true,
    isolateCreation: true,
    exportState: [
        'currentId',
        'currentIdFromScroll',
        'animatePin',
        'svgLeft',
        'svgRight',
    ],
    state: {
        svgLeft: () => ({
            value: 0,
            type: '',
        }),
        svgRight: () => ({
            value: 0,
            type: '',
        }),
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
