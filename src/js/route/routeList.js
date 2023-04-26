import { pageNotFoundModule } from '../pages/404';
import { animatedPatternN0Module } from '../pages/animatedPattern/animatedPatternN0';
import { animatedPatternN1Module } from '../pages/animatedPattern/animatedPatternN1';
import { caterpillarN1Module } from '../pages/canvas/caterpillarN1';
import { homeModule } from '../pages/home';
import { testModule } from '../pages/test';

/**
 * Route
 */
export const routeList = {
    home: homeModule,
    test: testModule,
    caterpillarN1: caterpillarN1Module,
    animatedPatternN0: animatedPatternN0Module,
    animatedPatternN1: animatedPatternN1Module,
    pageNotFound: pageNotFoundModule,
};

export const getRouteModule = ({ url = '' }) => {
    if (url === '') return 'home';
    return url in routeList ? url : 'pageNotFound';
};
