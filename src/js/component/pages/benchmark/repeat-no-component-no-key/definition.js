//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatNoComponentNoKeyFunction } from './benchmark-repeat-no-component-no-key';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const BenchMarkRepeatNoComponentNoKey = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-repeat-no-component-no-key',
        component: BenchMarkRepeatNoComponentNoKeyFunction,
        ...benchMarkDefinitionPartial(1001),
    })
);
