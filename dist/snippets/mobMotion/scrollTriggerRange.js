import { scroller } from '../mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Builtin propierties
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'x',
    range: '+50vw',
    // propierties: 'rotateY',
    // range: '+15deg',
    start: 'bottom',
    end: 'bottom +50vh',
});

myScrollTrigger.init();
