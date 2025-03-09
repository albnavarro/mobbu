import { MobScroll } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Create instance.
 */
const myScrollTrigger = MobScroll.createScrollTrigger({
    item: myTarget,
    propierties: 'rotate',
    range: '45deg ',
    start: 'bottom +50vh -halfHeight',
    end: 'top',

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
myScrollTrigger.init();
