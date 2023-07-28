import { pageNotFoundModule } from './404';
import { animatedPatternN0v1Module } from './animatedPattern/animatedPatternN0v1';
import { animatedPatternN0v2Module } from './animatedPattern/animatedPatternN0v2';
import { animatedPatternN0v3Module } from './animatedPattern/animatedPatternN0v3';
import { animatedPatternN1Module } from './animatedPattern/animatedPatternN1';
import { caterpillarN1Module } from './canvas/caterpillarN1';
import { caterpillarN2Module } from './canvas/caterpillarN2';
import { homeModule } from './home';
import { horizontalScrollerModule } from './horizontalScroller';
import { scrollerN0Module } from './scroller/scrollerN0';
import { testModule } from './test';

/**
 * Route
 */
export const routeList = {
    home: homeModule,
    test: testModule,
    caterpillarN1: caterpillarN1Module,
    caterpillarN2: caterpillarN2Module,
    animatedPatternN0v1: animatedPatternN0v1Module,
    animatedPatternN0v2: animatedPatternN0v2Module,
    animatedPatternN0v3: animatedPatternN0v3Module,
    animatedPatternN1: animatedPatternN1Module,
    scrollerN0: scrollerN0Module,
    horizontalScroller: horizontalScrollerModule,
    pageNotFound: pageNotFoundModule,
};
