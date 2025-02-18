//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugFilterHeadFn } from './debugFilterHead';

/**
 * @import { CreateComponentParams } from "../../../../../../mobjs/type";
 **/

export const DebugFilterHead = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-filter-head',
        component: DebugFilterHeadFn,
    })
);
