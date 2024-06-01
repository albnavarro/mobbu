import { createComponent } from '../../../mobjs';
import { Footer } from './footer';
import { footerNavDef } from './footerNav/definition';

export const footerComponentDef = createComponent({
    name: 'mob-footer',
    component: Footer,
    child: [footerNavDef],
});
