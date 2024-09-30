//@ts-check

import { createComponent } from '../../../mobjs';
import { ScrollToTopFn } from './ScrollToTop';

export const ScrollToTop = createComponent({
    name: 'scroll-to-top',
    component: ScrollToTopFn,
    exportState: ['active'],
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
