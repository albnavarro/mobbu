//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkInvalidateFn } from './benchmark-invalidate';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkInvalidate = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-invalidate',
        component: BenchMarkInvalidateFn,
        ...benchMarkDefinitionPartial(),
    })
);
