import { createComponent } from '../../../../mobjs';
import { FooterNavButtonFn } from './footerButton';
import { FooterNavFn } from './footerNav';

export const FooterNavButton = createComponent({
    name: 'footer-nav-button',
    component: FooterNavButtonFn,
    exportState: ['label', 'section'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        section: () => ({
            value: '',
            type: String,
        }),
    },
});

export const FooterNav = createComponent({
    name: 'footer-nav',
    component: FooterNavFn,
    child: [FooterNavButton],
});
