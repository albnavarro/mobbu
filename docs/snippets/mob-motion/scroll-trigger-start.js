import { MobScroll } from '@mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Create instance.
 */
const myScrollTrigger = MobScroll.createScrollTrigger({
    item: myTarget,
    propierties: 'rotate',
    range: '45deg ',

    /**
     * Start when top side of item reach 40px above the bottom side of the screen
     */
    start: 'bottom +40px',

    /**
     * End when bottom side reach 40px under the screen.
     */
    end: 'top +40px -height',
});

/**
 * Run instance.
 */
myScrollTrigger.init();
