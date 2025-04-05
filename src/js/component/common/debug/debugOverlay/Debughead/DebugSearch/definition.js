//@ts-check

import { MobJs } from '../../../../../../mob/mobjs';
import { DebugSearchFn } from './debugSearch';

/**
 * @import { CreateComponentParams } from "../../../../../../mob/mobjs/type";
 **/

export const DebugSearch = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DebugSearch>} */
    ({
        name: 'debug-search',
        component: DebugSearchFn,
    })
);
