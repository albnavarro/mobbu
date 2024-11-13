//@ts-check

import { createComponent } from '../../../../mobjs';
import { Move3D } from '../definition';
import { Move3DPagefn } from './move3DPage';

export const Move3DPage = createComponent({
    name: 'move-3d-page',
    component: Move3DPagefn,
    exportState: ['data'],
    state: {
        data: () => ({
            value: [],
            type: Array,
        }),
    },
    child: [Move3D],
});
