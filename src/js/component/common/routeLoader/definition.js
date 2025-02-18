//@ts-check

import { createComponent } from '../../../mobjs';
import { RouteLoaderFn } from './routeLoader';
/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const RouteLoader = createComponent(
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
