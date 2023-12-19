import { createComponent } from '../../../mobjs';
import { FooterNavButton } from './footerButton';
import { FooterNav } from './footerNav';

export const footerNavDef = createComponent({
    name: 'footer-nav',
    component: FooterNav,
});

export const footerNavButtonDef = createComponent({
    name: 'footer-nav-button',
    component: FooterNavButton,
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
