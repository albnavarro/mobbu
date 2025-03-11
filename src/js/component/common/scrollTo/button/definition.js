//@ts-check

import { MobJs } from '../../../../mobjs';
import { ScrollToButtonFn } from './scrollToButton';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
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
