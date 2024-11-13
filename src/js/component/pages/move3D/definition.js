//@ts-check

import { createComponent } from '../../../mobjs';
import { Move3Dfn } from '../move3D/Move3D.js';
import { Move3DItem } from './move3DItem/definition.js';

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
        'shape',
    ],
    state: {
        drag: () => ({
            value: false,
            type: Boolean,
        }),
        centerToViewoport: () => ({
            value: false,
            type: Boolean,
        }),
        useScroll: () => ({
            value: true,
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
        shape: () => ({
            value: [],
            type: Array,
        }),
    },
    child: [Move3DItem],
});
