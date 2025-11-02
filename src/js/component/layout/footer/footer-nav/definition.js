import { MobJs } from '@mobJs';
import { FooterNavButtonFn } from './footer-button';
import { FooterNavFn } from './footer-nav';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const FooterNavButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').FooterNavButton>} */
    ({
        tag: 'footer-nav-button',
        component: FooterNavButtonFn,
        bindStore: navigationStore,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            section: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
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
    state: {
        isMounted: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
