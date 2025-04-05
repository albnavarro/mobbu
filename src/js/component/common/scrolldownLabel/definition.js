import { MobJs } from '../../../mob/mobjs';
import { ScrollDownLabelFn } from './scrolldownLabel';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const ScrollDownLabel = MobJs.createComponent(
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
