//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatWithKyFunctionNested } from './benchmark-repeat-with-key-nested';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const BenchMarkRepeatWithKeyNested = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-repeat-key-nested',
        component: BenchMarkRepeatWithKyFunctionNested,
        ...benchMarkDefinitionPartial(31),
    })
);
