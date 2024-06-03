import { createComponent } from '../../../mobjs';
import { FooterShapeV1 } from '../../common/shapes/definition';
import { HorizontalScroller } from './horizontalScroller';
import { horizontalScrollerButtonDef } from './horizontalScrollerButton/definition';
import { horizontalScrollerSectionDef } from './horizontalScrollerSection/definition';

export const horizontalScrollerDef = createComponent({
    name: 'horizontal-scroller',
    component: HorizontalScroller,
    exportState: [
        'nextRoute',
        'prevRoute',
        'currentId',
        'currentIdFromScroll',
        'animatePin',
        'svgLeft',
        'svgRight',
    ],
    state: {
        nextRoute: () => ({
            value: '',
            type: String,
        }),
        prevRoute: () => ({
            value: '',
            type: String,
        }),
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
    child: [
        horizontalScrollerButtonDef,
        horizontalScrollerSectionDef,
        FooterShapeV1,
    ],
});
