//@ts-check

import { MobJs } from '../../../../../../mobjs';
import { DebugFilterHeadFn } from './debugFilterHead';

/**
 * @import { CreateComponentParams } from "../../../../../../mobjs/type";
 **/

export const DebugFilterHead = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-filter-head',
        component: DebugFilterHeadFn,
    })
);
