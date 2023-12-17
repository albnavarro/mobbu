import { scroller } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Opacity propierties.
 * The opacity starts from the bottom edge of the screen and ends at the top edge.
 */
const myParallax = scroller.createParallax({
    item: myTarget,
    propierties: 'opacity',
    opacityStart: 100,
    opacityEnd: 0,
});

myParallax.init();
