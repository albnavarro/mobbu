//@ts-check

import { MobJs } from '@mobJs';
import { FooterNavButtonFn } from './footerButton';
import { FooterNavFn } from './footerNav';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const FooterNavButton = MobJs.createComponent(
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

export const FooterNav = MobJs.createComponent({
    name: 'footer-nav',
    component: FooterNavFn,
    child: [FooterNavButton],
});
