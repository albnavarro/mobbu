import { headerComponentDef } from '../component/header/definition';
import { footerComponentDef } from '../component/footer/definition';
import { codeButtonComponentDef } from '../component/code/definition';
import { degubButtonComponentDef } from '../component/debug/definition';
import { navigationComponentDef } from '../component/navigation/definition';
import { testComponentDef } from '../component/test/definition';

export const componentList = {
    ...headerComponentDef,
    ...footerComponentDef,
    ...navigationComponentDef,
    ...codeButtonComponentDef,
    ...degubButtonComponentDef,
    ...testComponentDef,
};
