//@ts-check

import { createComponent } from '../../../mobjs';
import { DebugButton } from '../../common/debug/definition';
import { FooterFn } from './footer';
import { FooterNav } from './footerNav/definition';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const Footer = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'mob-footer',
        component: FooterFn,
        child: [FooterNav, DebugButton],
    })
);
