import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { ScrollerN0 } from './scrollerN0';

export const scrollerN0Def = createComponentDefinition({
    name: 'scrollerN0',
    component: ScrollerN0,
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
            value: [
                36, 37, 38, 39, 40, 47, 51, 58, 62, 69, 73, 80, 81, 82, 83, 84,
            ],
            type: Array,
        }),
        stagger: () => ({
            value: {
                type: 'equal',
                each: 6,
                from: 'random',
            },
            type: 'Any',
        }),
        reorder: () => ({
            value: true,
            type: Boolean,
        }),
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
