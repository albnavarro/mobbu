import { scroller } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Builtin propierties
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'x',
    dynamicRange: () => {
        return myTarget.offsetWidth;
    },
    start: 'bottom',
    end: 'bottom +50vh',
});

myScrollTrigger.init();
