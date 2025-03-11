//@ts-check

import { MobJs } from '../../../mobjs';
import { MobMotionCore } from '../../../mobMotion';
import { OnlyDesktopFn } from './onlyDesktop';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const OnlyDesktop = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').OnlyDesktop>} */
    ({
        name: 'only-desktop',
        component: OnlyDesktopFn,
        state: {
            active: () => ({
                value: MobMotionCore.mq('min', 'desktop'),
                type: Boolean,
            }),
        },
    })
);
