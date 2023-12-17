import { scroller } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Opacity propierties.
 * The opacity starts from the bottom edge of the screen and ends at the top edge.
 */
const myParallax = scroller.createParallax({
    item: myTarget,
    propierties: 'x',
    range: 6,
    align: 'center',

    /**
     * Once the neutral point is reached the animation is stopped.
     */
    onSwitch: 'in-stop',

    /**
     * Once the neutral point is reached the animation come back.
     * onSwitch: 'in-stop',
     */
});

myParallax.init();
