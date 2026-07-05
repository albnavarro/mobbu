import { MobJs } from '@mobJs';
import { SideBarLinksButtonFunction } from './side-bar-links-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SideBarLinksButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SideBarLinksButtonType>} */
    ({
        tag: 'sidebar-links-button',
        component: SideBarLinksButtonFunction,
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
