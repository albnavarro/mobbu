import { codeButtonComponentDef } from '../component/common/codeButton/definition';
import {
    codeOverlayButtonDef,
    codeOverlayDef,
} from '../component/common/codeOverlay/definition';
import { degubButtonComponentDef } from '../component/common/debug/definition';
import { footerComponentDef } from '../component/layout/footer/definition';
import {
    headerComponentDef,
    headerNavComponentDef,
    headerToggleComponentDef,
} from '../component/layout/header/definition';
import {
    navigationButtonDef,
    navigationComponentDef,
    navigationDef,
} from '../component/layout/navigation/definition';
import { animatedPatternN0Def } from '../component/pages/animatedPattern/animatedPatternN0/definition';
import { animatedPatternN1Def } from '../component/pages/animatedPattern/animatedPatternN1/definition';
import { caterpillarN0Def } from '../component/pages/canvas/caterpillarN0/definition';
import { caterpillarN1Def } from '../component/pages/canvas/caterpillarN1/definition';
import { homePageComponentDef } from '../component/pages/homepage/definition';
import { horizontalScrollerDef } from '../component/pages/horizontalScroller/definition';
import {
    testComponent2Def,
    testComponentDef,
} from '../component/pages/test/definition';

export const componentList = {
    ...headerComponentDef,
    ...headerNavComponentDef,
    ...headerToggleComponentDef,
    ...navigationComponentDef,
    ...navigationDef,
    ...navigationButtonDef,
    ...footerComponentDef,
    ...codeButtonComponentDef,
    ...codeOverlayDef,
    ...codeOverlayButtonDef,
    ...degubButtonComponentDef,
    ...homePageComponentDef,
    ...caterpillarN1Def,
    ...caterpillarN0Def,
    ...animatedPatternN0Def,
    ...animatedPatternN1Def,
    ...horizontalScrollerDef,
    ...testComponentDef,
    ...testComponent2Def,
};
