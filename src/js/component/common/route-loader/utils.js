import { MobJs } from '@mobJs';
import { routeLoader } from '../../instance-name';

/**
 * Re-enable route loading.
 *
 * - First load skip and use main-loader.
 *
 * @param {boolean} value
 */
export const skipRouteLoader = (value) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('@commonComponent/route-loader/type').RouteLoader>}
     */
    const loaderMethods = MobJs.useMethodByName(routeLoader);
    loaderMethods.skip(value);
};
