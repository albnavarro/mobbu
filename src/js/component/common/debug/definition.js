import { MobJs } from '@mobJs';
import { DebugButtonFn } from './debug-button';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugOverlayCta>} */
    ({
        tag: 'debug-button',
        component: DebugButtonFn,
        props: {
            ariaControls: {
                __value: '',
                __type: String,
            },
        },
    })
);
