import { scroller } from '../mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Create instance.
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'rotate',
    range: '45deg ',

    /**
     * Start when top side of item reach half screen height minus 1/2
     * of it's height from bottom.
     */
    start: 'bottom +50vh -halfHeight',

    /**
     * End when top side of item reach the top side of screen.
     */
    end: 'top',
});

/**
 * Run instance.
 */
myScrollTrigger.init();
