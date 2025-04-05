//@ts-check

import { MobJs } from '../../../../../../mob/mobjs';
import { DebugFilterHeadFn } from './debugFilterHead';

/**
 * @import { CreateComponentParams } from "../../../../../../mob/mobjs/type";
 **/

export const DebugFilterHead = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-filter-head',
        component: DebugFilterHeadFn,
    })
);
