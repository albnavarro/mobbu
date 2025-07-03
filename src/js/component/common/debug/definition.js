import { MobJs } from '@mobJs';
import { DebugButtonFn } from './debug-button';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugButton = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'debug-button',
        component: DebugButtonFn,
    })
);
