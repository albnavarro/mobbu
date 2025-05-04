//@ts-check

import { MobJs } from '@mobJs';
import { OnlyDesktopFnCta } from './only-desktop-cta';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const OnlyDesktopCta = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').OnlyDesktop>} */
    ({
        name: 'only-desktop-cta',
        component: OnlyDesktopFnCta,
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
