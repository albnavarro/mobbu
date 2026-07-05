import { MobJs } from '@mobJs';
import { SideBarLinksFunction } from './side-bar-links';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SideBarLinks = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SideBarLinks>} */
    ({
        tag: 'side-bar-links',
        component: SideBarLinksFunction,
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
