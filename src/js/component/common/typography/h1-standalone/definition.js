import { MobJs } from '@mobJs';
import { H1StandaloneFn } from './h1-standalone';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const H1Standalone = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').H1Standalone>} */
    ({
        tag: 'h1-standalone',
        component: H1StandaloneFn,
        props: {
            text: {
                __value: '',
                __type: String,
            },
        },
    })
);
