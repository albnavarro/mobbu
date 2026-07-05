import { MobJs } from '@mobJs';
import { DocContainerFunction } from './doc-container';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DocContainer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DocContainerType>} */
    ({
        tag: 'doc-container',
        component: DocContainerFunction,
        bindStore: docContainerStore,
        state: {
            rightSidebarVisible: {
                __value: false,
                __type: Boolean,
                __skipEqual: false,
            },
        },
    })
);
