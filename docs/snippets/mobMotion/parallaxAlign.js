import { MobScroll } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Opacity propierties.
 * The opacity starts from the bottom edge of the screen and ends at the top edge.
 */
const myParallax = MobScroll.createParallax({
    item: myTarget,
    propierties: 'x',
    range: 6,

    /**
     * 0 is at center of the screen.
     */
    align: 'center',

    /**
     * 0 is at 20vh from bottom edge of the screen.
     * align: 20,
     */
});

myParallax.init();
