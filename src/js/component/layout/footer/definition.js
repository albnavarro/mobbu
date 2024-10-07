//@ts-check

import { createComponent } from '../../../mobjs';
import { DebugButton } from '../../common/debug/definition';
import { FooterFn } from './footer';
import { FooterNav } from './footerNav/definition';

export const Footer = createComponent({
    name: 'mob-footer',
    component: FooterFn,
    child: [FooterNav, DebugButton],
});
