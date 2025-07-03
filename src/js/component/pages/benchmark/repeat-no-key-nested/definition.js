//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatWithNoKeyFnNested } from './benchmark-repeat-with-key-nested';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkRepeatWithNoKeyNested = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-repeat-key-no-nested',
        component: BenchMarkRepeatWithNoKeyFnNested,
        ...benchMarkDefinitionPartial(31),
    })
);
