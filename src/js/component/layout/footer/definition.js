import { MobJs } from '@mobJs';
import { FooterFunction } from './footer';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Footer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Footer>} */
    ({
        tag: 'mob-footer',
        component: FooterFunction,
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
