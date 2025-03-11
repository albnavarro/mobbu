//@ts-check

import { MobJs } from '../../../../mobjs';
import { DynamicListEmptyFn } from './dynamicListEmpty';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const DynamicListEmpty = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'dynamic-list-empty',
        component: DynamicListEmptyFn,
    })
);
