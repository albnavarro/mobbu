/**
 * routeList.js
 */
export * from './404';
export * from './path_to_route_home/home';
export * from './path_to_route_1/route1';
export * from './path_to_route_2/route2';
export * from './path_to_route_3/route3';
export * from './path_to_route_4/route4';

/**
 * main.js
 */
import * as pages from './pages/routeList';

/**
 * main.js
 */
inizializeApp({
    /**
     * Object that container all route.
     */
    pages,

    // ...
});
