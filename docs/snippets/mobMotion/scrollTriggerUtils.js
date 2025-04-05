import { MobScroll } from '@mobMotion';

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
myScrollTrigger.init();
