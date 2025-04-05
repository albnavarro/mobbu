//@ts-check

import { MobJs } from '@mobJs';
import { DebugFilterHeadFn } from './debugFilterHead';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DebugFilterHead = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-filter-head',
        component: DebugFilterHeadFn,
    })
);
