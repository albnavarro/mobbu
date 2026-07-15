import { MobJs } from '@mobJs';
import { SidebarLinksButtonFunction } from './side-bar-links-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SidebarLinksButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SidebarLinksButtonType>} */
    ({
        tag: 'sidebar-links-button',
        component: SidebarLinksButtonFunction,
        props: {
            label: {
                __value: '',
                __type: String,
            },
            url: {
                __value: '',
                __type: String,
            },
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
