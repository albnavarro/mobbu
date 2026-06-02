//@ts-check

import { MobJs } from '@mobJs';
import { HomeComponentFn } from './home';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HomeComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HomeComponent>} */
    ({
        tag: 'home-component',
        component: HomeComponentFn,
        props: {
            svg: {
                __value: [],
                __type: Array,
            },
        },
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
