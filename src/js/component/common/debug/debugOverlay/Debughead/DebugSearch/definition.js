//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugSearchFn } from './debugSearch';

/**
 * @import { CreateComponentParams } from "../../../../../../mobjs/type";
 **/

export const DebugSearch = createComponent(
    /** @type{CreateComponentParams<import('./type').DebugSearch>} */
    ({
        name: 'debug-search',
        component: DebugSearchFn,
    })
);
