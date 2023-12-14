import { scroller } from '../mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Create instance.
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'rotate',
    range: '45deg ',
    start: 'bottom +50vh -halfHeight',
    end: 'top',
    marker: 'my-scrolltrigger',
});

/**
 * Run instance.
 */
myScrollTrigger.init();
