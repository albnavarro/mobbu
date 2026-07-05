//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkInvalidateFunction } from './benchmark-invalidate';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const BenchMarkInvalidate = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-invalidate',
        component: BenchMarkInvalidateFunction,
        ...benchMarkDefinitionPartial(),
    })
);
