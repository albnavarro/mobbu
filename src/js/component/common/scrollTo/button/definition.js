//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { ScrollToButtonFn } from './scrollToButton';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const ScrollToButton = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').ScrollToButton>} */
    ({
        name: 'scroll-to-button',
        component: ScrollToButtonFn,
        exportState: ['label', 'active'],
        state: {
            label: () => ({
                value: '',
                type: String,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
