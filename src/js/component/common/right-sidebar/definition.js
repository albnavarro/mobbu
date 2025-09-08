import { MobJs } from '@mobJs';
import { RightSidebarFn } from './right-sidebar';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const RightSidebar = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').RightSidebar>} */
    ({
        tag: 'right-sidebar',
        component: RightSidebarFn,
        exportState: ['data'],
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
