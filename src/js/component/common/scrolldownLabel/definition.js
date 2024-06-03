import { createComponent } from '../../../mobjs';
import { ScrollDownLabelFn } from './scrolldownLabel';

export const ScrollDownLabel = createComponent({
    name: 'scroll-down-label',
    component: ScrollDownLabelFn,
    exportState: ['active'],
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
