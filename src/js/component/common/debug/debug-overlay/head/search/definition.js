import { MobJs } from '@mobJs';
import { DebugSearchFunction } from './debug-search';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugSearch = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugSearchType>} */
    ({
        tag: 'debug-search',
        component: DebugSearchFunction,
    })
);
