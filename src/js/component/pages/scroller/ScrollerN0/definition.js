import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { ScrollerN0 } from './scrollerN0';

export const scrollerN0Def = createComponentDefinition({
    name: 'scrollerN0',
    component: ScrollerN0,
    props: {
        numberOfRow: 10,
        numberOfColumn: 10,
        cellWidth: 65,
        cellHeight: 65,
        gutter: 1,
        fill: [36, 37, 38, 39, 40, 47, 51, 58, 62, 69, 73, 80, 81, 82, 83, 84],
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
