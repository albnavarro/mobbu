import { scroller } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Builtin propierties
 */
const myParallax = scroller.createParallax({
    item: myTarget,
    propierties: 'x',

    /**
     * False
     */
    range: 9,

    /**
     * Slow:
     * range: 2,
     */
});

myParallax.init();
