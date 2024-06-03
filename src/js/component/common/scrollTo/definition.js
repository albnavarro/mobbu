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
        anchorItems: () => ({
            value: [],
            type: Array,
        }),
    },
    child: [ScrollToButton],
});
