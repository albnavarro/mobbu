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
     * utils params.
     */
    disableForce3D: true,
    useThrottle: true,
    perspective: 600,
    useWillChange: true,
});

/**
 * Run instance.
 */
myParallax.init();
