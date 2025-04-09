//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListEmptyFn } from './dynamic-list-empty';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DynamicListEmpty = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        name: 'dynamic-list-empty',
        component: DynamicListEmptyFn,
    })
);
