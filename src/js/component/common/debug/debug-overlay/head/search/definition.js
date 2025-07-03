import { MobJs } from '@mobJs';
import { DebugSearchFn } from './debug-search';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugSearch = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugSearch>} */
    ({
        tag: 'debug-search',
        component: DebugSearchFn,
    })
);
