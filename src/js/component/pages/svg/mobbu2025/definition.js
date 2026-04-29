//@ts-check

import { MobJs } from '@mobJs';
import { Mobbu2025fn } from './mob2025';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Mobbu2025 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Mobbu2025>} */
    ({
        tag: 'mobbu-2025',
        component: Mobbu2025fn,
        props: {
            layer02: () => ({
                value: document.createElement('div'),
                type: Element,
            }),
            layer03: () => ({
                value: document.createElement('div'),
                type: Element,
            }),
        },
    })
);
