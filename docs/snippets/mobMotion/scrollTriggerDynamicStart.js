import { MobScroll } from '@mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * I move myTarget on the Y axis by a value corresponding to its height,
 * from when its upper edge touches the lower edge of the screen
 * and stops when the element is completely visible,
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
            return 0;
        },
    },
    dynamicEnd: {
        position: 'bottom',
        value: () => {
            return myTarget.offsetHeight;
        },
    },
});

/**
 * In this case the animation starts when the element is
 * completely visible and ends 100px below the top edge of the screen.
 */
const myScrollTrigger = MobSc.createScrollTrigger({
    item: myTarget,
    propierties: 'y',
    dynamicRange: () => {
        return myTarget.offsetHeight;
    },
    dynamicStart: {
        position: 'bottom',
        value: () => {
            return myTarget.offsetHeight;
        },
    },
    dynamicEnd: {
        position: 'top',
        value: () => {
            return 100;
        },
    },
});

/**
 * Run instance.
 */
myScrollTrigger.init();
