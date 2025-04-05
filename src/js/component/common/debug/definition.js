//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { DebugButtonFn } from './debugButton';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const DebugButton = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-button',
        component: DebugButtonFn,
    })
);
