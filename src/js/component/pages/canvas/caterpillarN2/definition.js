import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN2 } from './caterpillarN2';

const duration = 10;

export const caterpillarN2Def = createComponentDefinition({
    name: 'Caterpillarn2',
    component: CaterpillarN2,
    props: {
        numItems: 30,
        width: 60,
        height: 60,
        radius: 20,
        fill: [2, 10],
        opacity: 0.02,
        xAmplitude: 500,
        yAmplitude: 400,
        duration: 10,
        friction: duration / 2 / Math.PI,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
