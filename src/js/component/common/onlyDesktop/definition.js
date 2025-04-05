//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { MobMotionCore } from '../../../mob/mobMotion';
import { OnlyDesktopFn } from './onlyDesktop';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
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
