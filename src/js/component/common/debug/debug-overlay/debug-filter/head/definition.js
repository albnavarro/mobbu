//@ts-check

import { MobJs } from '@mobJs';
import { DebugFilterHeadFn } from './debug-filter-head';

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
