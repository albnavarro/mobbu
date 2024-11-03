//@ts-check

import { createComponent } from '../../../mobjs';
import { ScrollToButton } from './button/definition';
import { ScrollToFn } from './scrollTo';

export const ScrollTo = createComponent({
    name: 'scroll-to',
    component: ScrollToFn,
    exportState: ['activeId'],
    state: {
        activeLabel: () => ({
            value: '',
            type: String,
        }),
        anchorItemsToBeComputed: () => ({
            value: [],
            type: Array,
        }),
        anchorItems: () => ({
            value: [],
            type: Array,
        }),
    },
    child: [ScrollToButton],
});
