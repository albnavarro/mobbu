import { codeButtonComponentDef } from '../component/common/codeButton/definition';
import { codeOverlayComponentDef } from '../component/common/codeOverlay/definition';
import { degubButtonComponentDef } from '../component/common/debug/definition';
import { legendComponentDef } from '../component/common/legend/definition';
import { footerComponentDef } from '../component/layout/footer/definition';
import { headerComponentDef } from '../component/layout/header/definition';
import { navigationComponentDef } from '../component/layout/navigation/definition';
import { animatedPatternN0Def } from '../component/pages/animatedPattern/animatedPatternN0/definition';
import { animatedPatternN1Def } from '../component/pages/animatedPattern/animatedPatternN1/definition';
import { caterpillarN0Def } from '../component/pages/canvas/caterpillarN0/definition';
import { caterpillarN1Def } from '../component/pages/canvas/caterpillarN1/definition';
import { homePageComponentDef } from '../component/pages/homepage/definition';
import { testComponentDef } from '../component/pages/test/definition';

export const componentList = {
    ...headerComponentDef,
    ...footerComponentDef,
    ...navigationComponentDef,
    ...codeButtonComponentDef,
    ...codeOverlayComponentDef,
    ...legendComponentDef,
    ...degubButtonComponentDef,
    ...homePageComponentDef,
    ...caterpillarN1Def,
    ...caterpillarN0Def,
    ...animatedPatternN0Def,
    ...animatedPatternN1Def,
    ...testComponentDef,
};
