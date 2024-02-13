import { createComponent } from '../../../mobjs';
import { ScrollTo } from './scrollTo';

export const scrollToDef = createComponent({
    name: 'scroll-to',
    component: ScrollTo,
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
});
