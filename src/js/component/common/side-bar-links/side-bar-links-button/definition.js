import { MobJs } from '@mobJs';
import { SideBarLinksButtonFn } from './side-bar-links-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SideBarLinksButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SideBarLinksButtonType>} */
    ({
        tag: 'sidebar-links-button',
        component: SideBarLinksButtonFn,
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
