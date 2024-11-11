//@ts-check

import { createComponent } from '../../../mobjs';
import { Move3Dfn } from '../move3D/Move3D.js';

export const Move3D = createComponent({
    name: 'move-3d',
    component: Move3Dfn,
    exportState: [],
    state: {
        test: () => ({
            value: '',
            type: String,
        }),
    },
    child: [],
});
