//@ts-check

import { MobJs } from '@mobJs';
import { DebugButtonFn } from './debugButton';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DebugButton = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'debug-button',
        component: DebugButtonFn,
    })
);
