import { pageNotFoundModule } from '../pages/404';
import { caterpillarCanvasModule } from '../pages/canvas/caterpillarCanvas';
import { homeModule } from '../pages/home';
import { testModule } from '../pages/test';

/**
 * Route
 */
export const routeList = {
    home: homeModule,
    test: testModule,
    caterpillarCanvas: caterpillarCanvasModule,
    pageNotFound: pageNotFoundModule,
};

export const getRouteModule = ({ url = '' }) => {
    if (url === '') return 'home';
    return url in routeList ? url : 'pageNotFound';
};
