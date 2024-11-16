//@ts-check

import { createComponent } from '../../../../mobjs';
import { StarSvgFn } from './StarSvg';

export const StarSvg = createComponent({
    name: 'svg-star',
    component: StarSvgFn,
    exportState: ['fill'],
    state: {
        fill: () => ({
            value: '#000000',
            type: String,
        }),
    },
});
