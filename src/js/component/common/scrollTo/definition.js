import { createComponent } from '../../../mobjs';
import { ScrollTo } from './scrollTo';

export const scrollToDef = createComponent({
    name: 'scroll-to',
    component: ScrollTo,
    exportState: ['activeId'],
    state: {
        activeId: () => ({
            value: 0,
            type: Number,
        }),
    },
});
