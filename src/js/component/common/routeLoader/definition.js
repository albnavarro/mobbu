//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { RouteLoaderFn } from './routeLoader';
/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const RouteLoader = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').RouteLoader>} */
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
