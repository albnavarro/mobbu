//@ts-check

import { createComponent } from '../../../../mobjs';
import { DynamicListEmptyFn } from './dynamicListEmpty';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const DynamicListEmpty = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'dynamic-list-empty',
        component: DynamicListEmptyFn,
    })
);
