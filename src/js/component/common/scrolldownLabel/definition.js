import { createComponent } from '../../../mobjs';
import { ScrollDownLabel } from './scrolldownLabel';

export const scrollDownLabelDef = createComponent({
    name: 'scroll-down-label',
    component: ScrollDownLabel,
    exportState: ['active'],
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
