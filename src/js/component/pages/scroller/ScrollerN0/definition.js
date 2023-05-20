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
        fill: [16, 27, 38, 49, 60, 71, 82, 93],
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
