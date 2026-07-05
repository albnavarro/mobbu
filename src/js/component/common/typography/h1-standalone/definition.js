import { MobJs } from '@mobJs';
import { H1StandaloneFunction } from './h1-standalone';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const H1Standalone = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').H1Standalone>} */
    ({
        tag: 'h1-standalone',
        component: H1StandaloneFunction,
        props: {
            text: {
                __value: '',
                __type: String,
            },
        },
    })
);
