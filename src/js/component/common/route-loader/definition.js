import { MobJs } from '@mobJs';
import { RouteLoaderFn } from './route-loader';
/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const RouteLoader = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').RouteLoader>} */
    ({
        tag: 'route-loader',
        component: RouteLoaderFn,
        state: {
            isLoading: {
                __value: false,
                __type: Boolean,
            },
            isDisable: {
                __value: false,
                __type: Boolean,
            },
            skip: {
                __value: true,
                __type: Boolean,
            },
        },
    })
);
