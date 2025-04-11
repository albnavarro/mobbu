import { MobScroll } from '@mobMotion';

/**
 * Horizontal Scroller item.
 * display: flex;
 * height: 100vh;
 */
const myScrollerItem = document.querySelector('.myScroller');

/**
 * i.e:
 * Get section with inside myScrollerItem
 * Supposed myScrollerItem is display: flex.
 * and sections are ten element width: 100vw;
 */
const sectionWidth = window.innerWidth;
const numOfSection = 10;
const elementWidth = sectionWidth * numOfSection;

/**
 * i.e:
 * Supposed myTrigger is a HTMLElement under myScrollerItem with a
 * margin-top: -100vh ( To have the top edges aligned with scroller )
 * The height of this element will determine the duration of the scroll.
 *
 */
const myTrigger = document.querySelector('.myTrigger');
myTrigger.style.height = `${elementWidth}px`;

/**
 * Create basic child scrollTrigger.
 * It is possible to use a parallax too.
 *
 * Move from left edge to the center of the screen.
 */
const myChild = document.querySelector('.myChild');
const myScrollTriggerChild = MobScroll.createScrollTrigger({
    item: myChild,

    // window scroll has no effect if scroller is !== window.
    scroller: myScrollerItem, // we use the scroller instead of the window.
    propierties: 'x',
    direction: 'horizontal', // The scroller moves on the x axis.
    range: '50vw',
    start: 'right',
    end: 'left +50vw',

    /**
     * Start from 50vw
     */
    fromTo: true,
});

/**
 * Create basic horizontal scroller.
 */
const myScrollTrigger = MobScroll.createScrollTrigger({
    item: myScrollerItem,
    trigger: myTrigger,
    propierties: 'x',
    pin: true,
    ease: true,

    /**
     * Move horizontal by item with minus windows width.
     */
    dynamicRange: () => {
        return -(elementWidth - window.innerWidth);
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
            return elementWidth;
        },
    },

    /**
     * Move myScrollTriggerChild on every tick.
     * value and parentIsMoving is needed for internal mechanism.
     */
    onTick: ({ value, parentIsMoving }) => {
        myScrollTriggerChild.move({ value, parentIsMoving });
    },
});

/**
 * Run instance.
 */
myScrollTriggerChild.init();
myScrollTrigger.init();
