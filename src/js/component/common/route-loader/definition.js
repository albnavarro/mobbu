//@ts-check

import { MobJs } from '@mobJs';
import { RouteLoaderFn } from './route-loader';
/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const RouteLoader = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').RouteLoader>} */
    ({
        name: 'route-loader',
        component: RouteLoaderFn,
        state: {
            isLoading: () => ({
                value: false,
                type: Boolean,
            }),
            isDisable: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
