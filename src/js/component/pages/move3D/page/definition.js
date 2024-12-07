//@ts-check

import { createComponent } from '../../../../mobjs';
import { Move3D } from '../definition';
import { Move3DPagefn } from './move3DPage';

export const Move3DPage = createComponent({
    name: 'move-3d-page',
    component: Move3DPagefn,
    exportState: ['data', 'prevRoute', 'nextRoute'],
    state: {
        data: () => ({
            value: [],
            type: Array,
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
        nextRoute: () => ({
            value: '',
            type: String,
        }),
        prevRoute: () => ({
            value: '',
            type: String,
        }),
    },
    child: [Move3D],
});
