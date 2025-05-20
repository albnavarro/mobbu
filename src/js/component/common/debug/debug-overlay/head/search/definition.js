import { MobJs } from '@mobJs';
import { DebugSearchFn } from './debug-search';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugSearch = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugSearch>} */
    ({
        name: 'debug-search',
        component: DebugSearchFn,
    })
);
