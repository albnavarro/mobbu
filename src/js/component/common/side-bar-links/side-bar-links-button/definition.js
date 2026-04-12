import { MobJs } from '@mobJs';
import { SideBarLinksButtonFn } from './side-bar-links-button';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SideBarLinksButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SideBarLinksButtonType>} */
    ({
        tag: 'sidebar-links-button',
        component: SideBarLinksButtonFn,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            url: () => ({
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
