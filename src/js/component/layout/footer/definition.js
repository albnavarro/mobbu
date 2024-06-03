import { createComponent } from '../../../mobjs';
import { FooterFn } from './footer';
import { FooterNav } from './footerNav/definition';

export const Footer = createComponent({
    name: 'mob-footer',
    component: FooterFn,
    child: [FooterNav],
});
