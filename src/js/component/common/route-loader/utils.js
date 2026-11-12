import { routeLoader } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * Re-enable route loading.
 *
 * - First load skip and use main-loader.
 *
 * @param {boolean} shouldSkip
 */
export const skipRouteLoader = (shouldSkip) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('@commonComponent/route-loader/type').RouteLoader>}
     */
    const loaderMethods = MobJs.useMethodByName(routeLoader);
    loaderMethods.skip(shouldSkip);
};
