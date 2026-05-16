import { MobJs } from '@mobJs';
import { SideBarLinksFn } from './side-bar-links';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SideBarLinks = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SideBarLinks>} */
    ({
        tag: 'side-bar-links',
        component: SideBarLinksFn,
        state: {
            data: {
                __value: [],
                __type: Array,
            },
            activeSection: {
                __value: '',
                __type: String,
            },
            hide: {
                __value: true,
                __type: Boolean,
            },
            shift: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
