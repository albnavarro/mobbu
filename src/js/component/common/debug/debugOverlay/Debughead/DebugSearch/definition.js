//@ts-check

import { MobJs } from '../../../../../../mobjs';
import { DebugSearchFn } from './debugSearch';

/**
 * @import { CreateComponentParams } from "../../../../../../mobjs/type";
 **/

export const DebugSearch = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DebugSearch>} */
    ({
        name: 'debug-search',
        component: DebugSearchFn,
    })
);
