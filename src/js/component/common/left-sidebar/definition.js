import { MobJs } from '@mobJs';
import { LightSidebarFunction } from './left-sidebar';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const LeftSidebar = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').LeftSidebar>} */
    ({
        tag: 'left-sidebar',
        component: LightSidebarFunction,
        bindStore: MobJs.mainStore,
        state: {
            data: {
                __value: [],
                __type: Array,
            },
            isVisible: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
