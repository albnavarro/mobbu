//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatNoComponentNoKeyFn } from './benchmark-repeat-no-component-no-key';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const BenchMarkRepeatNoComponentNoKey = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-repeat-no-component-no-key',
        component: BenchMarkRepeatNoComponentNoKeyFn,
        ...benchMarkDefinitionPartial(101),
    })
);
