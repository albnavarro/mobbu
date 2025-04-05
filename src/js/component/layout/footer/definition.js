//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { DebugButton } from '../../common/debug/definition';
import { FooterFn } from './footer';
import { FooterNav } from './footerNav/definition';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const Footer = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'mob-footer',
        component: FooterFn,
        child: [FooterNav, DebugButton],
    })
);
