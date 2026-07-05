//@ts-check

import { MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../constant';
import { DebugComponentFunction } from './debug-component';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugComponentType>} */
    ({
        tag: 'debug-component',
        component: DebugComponentFunction,
        state: {
            id: {
                __value: RESET_FILTER_DEBUG,
                __type: String,
                __skipEqual: false,
            },
            parentId: {
                __value: '',
                __type: String,
                __skipEqual: false,
            },
        },
    })
);
