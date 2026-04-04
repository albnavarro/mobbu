import { MobJs } from '@mobJs';
import { SideBarLinksFn } from './side-bar-links';
import { SideBarLinksButton } from './side-bar-links-button/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SideBarLinks = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SideBarLinks>} */
    ({
        tag: 'side-bar-links',
        component: SideBarLinksFn,
        child: [SideBarLinksButton],
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            activeSection: () => ({
                value: '',
                type: String,
            }),
            hide: () => ({
                value: true,
                type: Boolean,
            }),
            shift: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
