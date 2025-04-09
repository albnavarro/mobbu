//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatWithKyFnNested } from './benchmark-repeat-with-key-nested';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkRepeatWithKeyNested = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-key-nested',
        component: BenchMarkRepeatWithKyFnNested,
        ...benchMarkDefinitionPartial(31),
    })
);
