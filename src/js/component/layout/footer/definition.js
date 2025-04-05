//@ts-check

import { MobJs } from '@mobJs';
import { DebugButton } from '../../common/debug/definition';
import { FooterFn } from './footer';
import { FooterNav } from './footerNav/definition';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const Footer = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'mob-footer',
        component: FooterFn,
        child: [FooterNav, DebugButton],
    })
);
