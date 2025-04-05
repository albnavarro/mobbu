//@ts-check

import { MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { OnlyDesktopFn } from './onlyDesktop';

/**
 * @import { CreateComponentParams } from "@mobJsType";
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
