import { MobJs } from '@mobJs';
import { LightSidebarFn } from './left-sidebar';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const LeftSidebar = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').LeftSidebar>} */
    ({
        tag: 'left-sidebar',
        component: LightSidebarFn,
        bindStore: [MobJs.mainStore],
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            isVisible: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
