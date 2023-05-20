import { createComponentDefinition } from '../../../mobjs';
import { detectFirefox, detectSafari } from '../../../utils/utils';
import { ScrollerN0 } from './scrollerN0';

export const scrollerN0Def = createComponentDefinition({
    name: 'scrollerN0',
    component: ScrollerN0,
    props: {
        amountOfPath: 17,
        width: 30,
        height: 30,
        radius: 100,
        fill: '',
        stroke: '#fff',
        opacity: 0.05,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
});
