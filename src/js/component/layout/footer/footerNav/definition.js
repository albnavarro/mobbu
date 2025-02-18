//@ts-check

import { createComponent } from '../../../../mobjs';
import { FooterNavButtonFn } from './footerButton';
import { FooterNavFn } from './footerNav';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const FooterNavButton = createComponent(
    /** @type{CreateComponentParams<import('./type').FooterNavButton>} */
    ({
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
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

export const FooterNav = createComponent({
    name: 'footer-nav',
    component: FooterNavFn,
    child: [FooterNavButton],
});
