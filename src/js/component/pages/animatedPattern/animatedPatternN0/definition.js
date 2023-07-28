import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { AnimatedPatternN0 } from './animatedPatternN0';

export const animatedPatternN0Def = createComponentDefinition({
    name: 'AnimatedPatternN0',
    component: AnimatedPatternN0,
    state: {
        numberOfRow: () => ({
            value: 10,
            type: Number,
        }),
        numberOfColumn: () => ({
            value: 10,
            type: Number,
        }),
        cellWidth: () => ({
            value: 65,
            type: Number,
        }),
        cellHeight: () => ({
            value: 65,
            type: Number,
        }),
        gutter: () => ({
            value: 1,
            type: Number,
        }),
        fill: () => ({
            value: [16, 27, 38, 49, 60, 71, 82, 93],
            type: Array,
        }),
        stagger: () => ({
            value: {
                each: 5,
                grid: { col: 11, row: 11, direction: 'row' },
                waitComplete: false,
            },
            type: 'any',
        }),
        reorder: () => ({
            value: true,
            type: Boolean,
        }),
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
