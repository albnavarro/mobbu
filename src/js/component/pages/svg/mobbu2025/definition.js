//@ts-check

import { MobJs } from '@mobJs';
import { Mobbu2025fn } from './mob2025';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const mobbbu2025 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Mobbu2025>} */
    ({
        tag: 'mobbu-2025',
        component: Mobbu2025fn,
        props: {
            layer01: () => ({
                value: '',
                type: String,
            }),
            layer02: () => ({
                value: '',
                type: String,
            }),
            layer03: () => ({
                value: '',
                type: String,
            }),
            layer04: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
