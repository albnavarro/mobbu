//@ts-check

import { createComponent } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { OnlyDesktopFn } from './onlyDesktop';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const OnlyDesktop = createComponent(
    /** @type{CreateComponentParams<import('./type').OnlyDesktop>} */
    ({
        name: 'only-desktop',
        component: OnlyDesktopFn,
        state: {
            active: () => ({
                value: motionCore.mq('min', 'desktop'),
                type: Boolean,
            }),
        },
    })
);
