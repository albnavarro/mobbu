//@ts-check

import { createComponent } from '../../../mobjs';
import { RouteLoaderFn } from './routeLoader';

export const RouteLoader = createComponent({
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
});
