//@ts-check

import { createComponent } from '../../../mobjs';
import { Move3Dfn } from './Move3D';
import { Move3DItem } from './move3DItem/definition';

export const Move3D = createComponent({
    name: 'move-3d',
    component: Move3Dfn,
    exportState: [
        'drag',
        'centerToViewoport',
        'perspective',
        'xDepth',
        'yDepth',
        'factor',
        'shape',
        'debug',
        'perspective',
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
            validate: (value) => {
                return value > 1;
            },
            strict: true,
        }),
        yDepth: () => ({
            value: 20,
            type: Number,
            validate: (value) => {
                return value > 1;
            },
            strict: true,
        }),
        factor: () => ({
            value: 45,
            type: Number,
            validate: (value) => {
                return value > 1;
            },
            strict: true,
        }),
        shape: () => ({
            value: [],
            type: Array,
        }),
        debug: () => ({
            value: false,
            type: Boolean,
        }),
    },
    child: [Move3DItem],
});
