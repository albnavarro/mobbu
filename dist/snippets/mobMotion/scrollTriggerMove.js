import { scroller } from '../../../src/js/mobMotion';

const myScrollerItem = document.querySelector('myTarget');
const myTrigger = document.querySelector('myTrigger');
const myChild = document.querySelector('myChild');

/**
 * Create basic scrollTrigger.
 * It is possible to use a parallax too.
 *
 * Move from left edge to the center of the screen.
 */
const myScrollTriggerChild = scroller.createScrollTrigger({
    item: myChild,

    // window scroll has no effect if scroller is !== window.
    scroller: myScrollerItem,
    propierties: 'x',
    direction: 'horizontal',
    range: '50vw',
    start: 'right',
    end: 'left +50vw',

    /**
     * Start from 50vw
     */
    fromTo: true,
});

myScrollTriggerChild.init();

/**
 * Create basic horizontal scroller.
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myScrollerItem,
    trigger: myTrigger,
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
        myScrollTriggerChild.move({ value, parentIsMoving });
    },
});

/**
 * Run instance.
 */
myScrollTrigger.init();
