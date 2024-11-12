//@ts-check

import { createComponent } from '../../../../mobjs';
import { Move3DItemfn } from './Move3DItem';

export const Move3DItem = createComponent({
    name: 'move-3d-item',
    component: Move3DItemfn,
    exportState: ['test', 'root'],
    state: {
        test: () => ({
            value: '',
            type: String,
        }),
        root: () => ({
            value: true,
            type: Boolean,
        }),
    },
    child: [],
});
