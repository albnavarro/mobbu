import { MobJs } from '@mobJs';
import { FooterFn } from './footer';
import { DebugButton } from '@commonComponent/debug/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Footer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Footer>} */
    ({
        tag: 'mob-footer',
        component: FooterFn,
        child: [DebugButton],
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
