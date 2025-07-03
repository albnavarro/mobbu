import { MobJs } from '@mobJs';
import { FooterNavButtonFn } from './footer-button';
import { FooterNavFn } from './footer-nav';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const FooterNavButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').FooterNavButton>} */
    ({
        tag: 'footer-nav-button',
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
    tag: 'footer-nav',
    component: FooterNavFn,
    child: [FooterNavButton],
});
