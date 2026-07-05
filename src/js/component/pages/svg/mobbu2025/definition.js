//@ts-check

import { MobJs } from '@mobJs';
import { Mobbu2025Function } from './mob2025';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Mobbu2025 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Mobbu2025>} */
    ({
        tag: 'mobbu-2025',
        component: Mobbu2025Function,
        props: {
            layer02: {
                __value: document.createElement('div'),
                __type: Element,
            },
            layer03: {
                __value: document.createElement('div'),
                __type: Element,
            },
        },
    })
);
