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
        fill: [
            21, 22, 23, 24, 25, 25, 26, 37, 42, 53, 58, 69, 74, 85, 86, 87, 88,
            89, 90,
        ],
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
