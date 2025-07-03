import { MobJs } from '@mobJs';
import { FooterFn } from './footer';
import { FooterNav } from './footer-nav/definition';
import { DebugButton } from '@commonComponent/debug/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const Footer = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'mob-footer',
        component: FooterFn,
        child: [FooterNav, DebugButton],
    })
);
