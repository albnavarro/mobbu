import { pageNotFoundModule } from '../pages/404';
import { homeModule } from '../pages/home';
import { testModule } from '../pages/test';

/**
 * Route
 */
export const routeList = {
    home: homeModule,
    test: testModule,
    pageNotFound: pageNotFoundModule,
};

export const getRouteModule = ({ url = '' }) => {
    if (url === '') return 'home';
    return routeList[url] ? url : 'pageNotFound';
};
