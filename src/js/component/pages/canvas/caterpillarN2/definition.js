import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN2 } from './caterpillarN2';

export const caterpillarN2Def = createComponentDefinition({
    name: 'Caterpillarn2',
    component: CaterpillarN2,
    props: {
        numItems: 10,
        width: 60,
        height: 60,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
