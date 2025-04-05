//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { DynamicListEmptyFn } from './dynamicListEmpty';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const DynamicListEmpty = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'dynamic-list-empty',
        component: DynamicListEmptyFn,
    })
);
