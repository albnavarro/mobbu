import { createComponent } from '../../../mobjs';
import { RouteLoader } from './routeLoader';

export const routeLoaderDef = createComponent({
    name: 'route-loader',
    component: RouteLoader,
    state: {
        isLoading: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
