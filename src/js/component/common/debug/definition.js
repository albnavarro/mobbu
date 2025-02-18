//@ts-check

import { createComponent } from '../../../mobjs';
import { DebugButtonFn } from './debugButton';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DebugButton = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-button',
        component: DebugButtonFn,
    })
);
