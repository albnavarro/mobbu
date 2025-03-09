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
     * All pin params
     */
    pin: true,
    animatePin: true,
    animateAtStart: false,
    anticipatePinOnLoad: true,
});

/**
 * Run instance.
 */
myScrollTrigger.init();
