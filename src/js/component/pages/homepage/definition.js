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
        exportState: ['svg'],
        state: {
            svg: () => ({
                value: '',
                type: String,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [],
    })
);
