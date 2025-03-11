//@ts-check

import { MobJs } from '../../../mobjs';
import { DebugButtonFn } from './debugButton';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DebugButton = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-button',
        component: DebugButtonFn,
    })
);
