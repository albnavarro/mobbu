import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { AnimatedPatternN1 } from './animatedPatternN1';

export const animatedPatternN1Def = createComponentDefinition({
    name: 'AnimatedPatternN1',
    component: AnimatedPatternN1,
    props: {
        numberOfRow: 7,
        numberOfColumn: 15,
        cellWidth: 70,
        cellHeight: 70,
        gutter: 10,
        fill: '#353244',
        stroke: '#000',
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
