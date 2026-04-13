import { MobJs } from '@mobJs';
import { FooterFn } from './footer';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Footer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Footer>} */
    ({
        tag: 'mob-footer',
        component: FooterFn,
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
