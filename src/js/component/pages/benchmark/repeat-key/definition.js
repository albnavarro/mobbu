//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatWithKyFn } from './benchmark-repeat-with-key';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkRepeatWithKey = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-repeat-key',
        component: BenchMarkRepeatWithKyFn,
        ...benchMarkDefinitionPartial(),
    })
);
