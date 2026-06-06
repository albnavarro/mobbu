import { MobJs } from '@mobJs';
import { DocContainerFn } from './doc-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DocContainer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DocContainerType>} */
    ({
        tag: 'doc-container',
        component: DocContainerFn,
        state: {
            rightSidebarVisible: {
                __value: false,
                __type: Boolean,
                __skipEqual: false,
            },
        },
    })
);
