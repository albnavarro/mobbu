import { MobJs } from '@mobJs';
import { SidebarLinksFunction } from './side-bar-links';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SidebarLinks = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SidebarLinks>} */
    ({
        tag: 'side-bar-links',
        component: SidebarLinksFunction,
        bindStore: docContainerStore,
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
            disable: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
