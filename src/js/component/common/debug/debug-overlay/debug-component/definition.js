//@ts-check

import { MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../constant';
import { DebugComponentFn } from './debug-component';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugComponent>} */
    ({
        tag: 'debug-component',
        component: DebugComponentFn,
        state: {
            id: () => ({
                value: RESET_FILTER_DEBUG,
                type: String,
                skipEqual: false,
            }),
        },
    })
);
