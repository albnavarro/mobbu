import { scroller } from '../../../src/js/mobMotion';

const myScrollerItem = document.querySelector('myTarget');
const myTrigger = document.querySelector('myTrigger');
const myParallaxItem = document.querySelector('myParallax');

/**
 * Create basic parallax.
 * It is also possible to use a scrollTrigger.
 */
const myParallax = scroller.createParallax({
    item: myParallaxItem,

    // window scroll has no effect if scroller is !== window.
    scroller: myScrollerItem,
    propierties: 'x',
    range: 7,
    reverse: true,
    ease: true,
});

/**
 * Create basic horizontal scroller.
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myScrollerItem,
    trigger: myTrigger,
    direction: 'horizontal',
    propierties: 'x',
    pin: true,

    /**
     * Move horizontal by item with minus windows width.
     */
    dynamicRange: () => {
        return -(myScrollerItem.offsetWidth - window.innerWidth);
    },

    /**
     * Start when trigger element touch upper edge of window.
     */
    dynamicStart: {
        position: 'bottom',
        value: () => {
            return window.innerHeight;
        },
    },

    /**
     * End when trigger element is completely visible
     */
    dynamicEnd: {
        position: 'bottom',
        value: () => {
            return myTrigger.offsetHeight;
        },
    },

    /**
     * Move myParallx in every tick.
     * value and parentIsMoving is needed for internal mechanism.
     */
    onTick: ({ value, parentIsMoving }) => {
        myParallax.move({ value, parentIsMoving });
    },
});

/**
 * Run instance.
 */
myScrollTrigger.init();
