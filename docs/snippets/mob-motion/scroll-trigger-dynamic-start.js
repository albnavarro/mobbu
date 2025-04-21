import { MobScroll } from '@mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Exactly like start-end example above.
 */
const myScrollTrigger = MobScroll.createScrollTrigger({
    item: myTarget,
    propierties: 'y',
    dynamicRange: () => {
        return myTarget.offsetHeight;
    },
    dynamicStart: {
        position: 'bottom',
        value: () => {
            return 40;
        },
    },
    dynamicEnd: {
        position: 'top',
        value: () => {
            return 40 - myTarget.offsetHeight;
        },
    },
});

/**
 * Run instance.
 */
myScrollTrigger.init();
