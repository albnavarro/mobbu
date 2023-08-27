import { codeButtonComponentDef } from './common/codeButton/definition';
import {
    codeOverlayButtonDef,
    codeOverlayDef,
} from './common/codeOverlay/definition';
import { degubButtonComponentDef } from './common/debug/definition';
import { pageTransitionComponentDef } from './common/pageTransition/definition';
import { footerComponentDef } from './layout/footer/definition';
import {
    headerComponentDef,
    headerNavComponentDef,
    headerToggleComponentDef,
} from './layout/header/definition';
import {
    navigationButtonDef,
    navigationComponentDef,
    navigationDef,
    navigationSubmenuDef,
} from './layout/navigation/definition';
import { animatedPatternN0Def } from './pages/animatedPattern/animatedPatternN0/definition';
import { animatedPatternN1Def } from './pages/animatedPattern/animatedPatternN1/definition';
import { caterpillarN0Def } from './pages/canvas/caterpillarN0/definition';
import { caterpillarN1Def } from './pages/canvas/caterpillarN1/definition';
import { caterpillarN2Def } from './pages/canvas/caterpillarN2/definition';
import { homePageComponentDef } from './pages/homepage/definition';
import { horizontalScrollerDef } from './pages/horizontalScroller/definition';
import { horizontalScrollerButtonDef } from './pages/horizontalScroller/horizontalScrollerButton/definition';
import { horizontalScrollerSectionDef } from './pages/horizontalScroller/horizontalScrollerSection/definition';
import { scrollerN0Def } from './pages/scroller/ScrollerN0/definition';
import {
    testComponent2Def,
    testComponent3Def,
    testComponentDef,
} from './pages/test/definition';

export const componentList = {
    ...headerComponentDef,
    ...headerNavComponentDef,
    ...headerToggleComponentDef,
    ...navigationComponentDef,
    ...navigationDef,
    ...navigationSubmenuDef,
    ...navigationButtonDef,
    ...footerComponentDef,
    ...pageTransitionComponentDef,
    ...codeButtonComponentDef,
    ...codeOverlayDef,
    ...codeOverlayButtonDef,
    ...degubButtonComponentDef,
    ...homePageComponentDef,
    ...caterpillarN1Def,
    ...caterpillarN0Def,
    ...caterpillarN2Def,
    ...animatedPatternN0Def,
    ...animatedPatternN1Def,
    ...scrollerN0Def,
    ...horizontalScrollerDef,
    ...horizontalScrollerButtonDef,
    ...horizontalScrollerSectionDef,
    ...testComponentDef,
    ...testComponent2Def,
    ...testComponent3Def,
};
