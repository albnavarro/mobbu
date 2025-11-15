//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatNoComponentWithKeyFn } from './benchmark-repeat-no-component-key';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkRepeatNoComponentWithKey = MobJs.createComponent(
    /** @type {CreateComponentParams<import('../type').BenchMark>} */
    ({
        tag: 'benchmark-repeat-no-component-with-key',
        component: BenchMarkRepeatNoComponentWithKeyFn,
        ...benchMarkDefinitionPartial(1001),
    })
);
