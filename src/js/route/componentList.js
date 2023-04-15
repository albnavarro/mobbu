import { codeButtonComponentDef } from '../component/common/codeButton/definition';
import { degubButtonComponentDef } from '../component/common/debug/definition';
import { footerComponentDef } from '../component/layout/footer/definition';
import { headerComponentDef } from '../component/layout/header/definition';
import { navigationComponentDef } from '../component/layout/navigation/definition';
import { testComponentDef } from '../component/pages/test/definition';

export const componentList = {
    ...headerComponentDef,
    ...footerComponentDef,
    ...navigationComponentDef,
    ...codeButtonComponentDef,
    ...degubButtonComponentDef,
    ...testComponentDef,
};
