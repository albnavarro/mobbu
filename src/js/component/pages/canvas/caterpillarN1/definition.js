import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN1 } from './caterpillarN1';

export const caterpillarN1Def = createComponentDefinition({
    name: 'Caterpillarn1',
    component: CaterpillarN1,
    props: {
        numItems: 20,
        width: 60,
        height: 60,
        fill: [14],
        opacity: 0.05,
        radius: 100,
        rotationEach: 15,
        centerEach: 5,
        rotationDuration: 5000,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
