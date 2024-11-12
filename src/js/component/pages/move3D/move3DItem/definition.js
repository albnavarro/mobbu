//@ts-check

import { createComponent } from '../../../../mobjs';
import { Move3DItemfn } from './Move3DItem';

export const Move3DItem = createComponent({
    name: 'move-3d-item',
    component: Move3DItemfn,
    exportState: ['root', 'depth', 'rotate', 'range', 'animate'],
    state: {
        root: () => ({
            value: true,
            type: Boolean,
        }),
        depth: () => ({
            value: 0,
            type: Number,
        }),
        rotate: () => ({
            value: 'x',
            type: String,
        }),
        range: () => ({
            value: 20,
            type: Number,
        }),
        anchorPoint: () => ({
            value: 'left',
            type: String,
        }),
        animate: () => ({
            value: true,
            type: Boolean,
        }),
    },
    child: [],
});
