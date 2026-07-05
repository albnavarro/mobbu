import { MobJs } from '@mobJs';
import { DebugFilterHeadFunction } from './debug-filter-head';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugFilterHead = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'debug-filter-head',
        component: DebugFilterHeadFunction,
    })
);
