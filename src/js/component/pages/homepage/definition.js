//@ts-check

import { MobJs } from '@mobJs';
import { HomeComponentFn } from './home';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const HomeComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HomeComponent>} */
    ({
        tag: 'home-component',
        component: HomeComponentFn,
        props: {
            svg: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
