import { createComponentDefinition } from '../../../../mobjs';
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
        fill: [16, 27, 38, 49, 60, 71, 82, 93],
        stroke: '#222',
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
