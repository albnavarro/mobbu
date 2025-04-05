//@ts-check

import { MobJs } from '../../../../../mob/mobjs';
import { RESET_FILTER_DEBUG } from '../constant';
import { DebugComponentFn } from './debugComponent';

/**
 * @import { CreateComponentParams } from "../../../../../mob/mobjs/type";
 **/

export const DebugComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DebugComponent>} */
    ({
        name: 'debug-component',
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
