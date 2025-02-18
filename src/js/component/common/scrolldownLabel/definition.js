import { createComponent } from '../../../mobjs';
import { ScrollDownLabelFn } from './scrolldownLabel';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const ScrollDownLabel = createComponent(
    /** @type{CreateComponentParams<import('./type').ScrollDownLabel>} */
    ({
        name: 'scroll-down-label',
        component: ScrollDownLabelFn,
        exportState: ['active'],
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
