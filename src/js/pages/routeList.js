import { pageNotFoundModule } from './404';
import { animatedPatternN0v1Module } from './animatedPattern/animatedPatternN0v1';
import { animatedPatternN0v2Module } from './animatedPattern/animatedPatternN0v2';
import { animatedPatternN0v3Module } from './animatedPattern/animatedPatternN0v3';
import { animatedPatternN0v4Module } from './animatedPattern/animatedPatternN0v4';
import { animatedPatternN1Module } from './animatedPattern/animatedPatternN1';
import { caterpillarN1Module } from './canvas/caterpillarN1';
import { caterpillarN2Module } from './canvas/caterpillarN2';
import { homeModule } from './home';
import { horizontalScrollerModuleV1 } from './horizontalScroller/horizontalScrollerv1';
import { horizontalScrollerModuleV2 } from './horizontalScroller/horizontalScrollerv2';
import { scrollerN0v1Module } from './scroller/scrollerN0v1';
import { scrollerN0v2Module } from './scroller/scrollerN0v2';
import { testModule } from './test';

/**
 * Route
 */
export const pages = {
    home: homeModule,
    test: testModule,
    caterpillarN1: caterpillarN1Module,
    caterpillarN2: caterpillarN2Module,
    animatedPatternN0v1: animatedPatternN0v1Module,
    animatedPatternN0v2: animatedPatternN0v2Module,
    animatedPatternN0v3: animatedPatternN0v3Module,
    animatedPatternN0v4: animatedPatternN0v4Module,
    animatedPatternN1: animatedPatternN1Module,
    scrollerN0v1: scrollerN0v1Module,
    scrollerN0v2: scrollerN0v2Module,
    horizontalScrollerV1: horizontalScrollerModuleV1,
    horizontalScrollerV2: horizontalScrollerModuleV2,
    pageNotFound: pageNotFoundModule,
};
