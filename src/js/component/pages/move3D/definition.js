//@ts-check

import { createComponent } from '../../../mobjs';
import { Move3Dfn } from '../move3D/Move3D.js';

export const Move3D = createComponent({
    name: 'move-3d',
    component: Move3Dfn,
    exportState: [
        'drag',
        'centerToViewoport',
        'perspective',
        'xDepth',
        'yDepth',
        'xLimit',
        'yLimit',
    ],
    state: {
        drag: () => ({
            value: true,
            type: Boolean,
        }),
        centerToViewoport: () => ({
            value: true,
            type: Boolean,
        }),
        useScroll: () => ({
            value: false,
            type: Boolean,
        }),
        perspective: () => ({
            value: 700,
            type: Number,
        }),
        xDepth: () => ({
            value: 20,
            type: Number,
        }),
        yDepth: () => ({
            value: 20,
            type: Number,
        }),
        xLimit: () => ({
            value: 35,
            type: Number,
        }),
        yLimit: () => ({
            value: 35,
            type: Number,
        }),
    },
    child: [],
});
