//@ts-check

import { createComponent } from '../../../mobjs';
import { AnimationTitleFn } from './animationTitle';

export const AnimationTitle = createComponent({
    name: 'animation-title',
    component: AnimationTitleFn,
    exportState: ['title', 'align', 'color'],
    state: {
        title: () => ({
            value: '',
            type: String,
        }),
        isMounted: () => ({
            value: false,
            type: Boolean,
        }),
        align: () => ({
            value: 'left',
            type: String,
            validate: (value) => {
                return ['left', 'right'].includes(value);
            },
        }),
        color: () => ({
            value: 'white',
            type: String,
            validate: (value) => {
                return ['white', 'black'].includes(value);
            },
        }),
    },
});
