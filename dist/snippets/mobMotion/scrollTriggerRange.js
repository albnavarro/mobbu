import { scroller, tween } from '../mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Builtin propierties
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'x',
    range: '+50vw',
    start: 'bottom',
    end: 'bottom +50vh',
});

myScrollTrigger.init();
