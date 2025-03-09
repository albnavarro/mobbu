import { MobScroll } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Create instance.
 */
const myParallax = MobScroll.createParallax({
    item: myTarget,
    propierties: 'rotate',
    range: 4,

    /**
     * Enable ease.
     */
    ease: true,

    /**
     * i.e. Spring
     * easeType: 'spring',
     * springConfig: 'gentle', // optional
     */

    /**
     * i.e. Lerp
     */
    easeType: 'lerp',
    lerpConfig: 0.06, // optional
});

/**
 * Run instance.
 */
myParallax.init();
