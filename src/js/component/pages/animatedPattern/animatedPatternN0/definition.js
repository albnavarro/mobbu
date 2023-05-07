import { createComponentDefinition } from '../../../../baseComponent/route/utils';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { AnimatedPatternN0 } from './animatedPatternN0';

export const animatedPatternN0Def = createComponentDefinition({
    name: 'AnimatedPatternN0',
    component: AnimatedPatternN0,
    props: {
        numberOfRow: 10,
        numberOfColumn: 10,
        cellWidth: 50,
        cellHeight: 50,
        gutter: 10,
        fill: '#353244',
        stroke: '#000',
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
