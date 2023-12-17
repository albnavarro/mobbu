import { scroller } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Create instance.
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'rotate',
    range: '45deg ',
    start: 'bottom +50vh -halfHeight',
    end: 'top',
    onEnter: () => {
        //
    },
    onEnterBack: () => {
        //
    },
    onLeave: () => {
        //
    },
    onLeaveBack: () => {
        //
    },
    onTick: ({ value, parentIsMoving }) => {
        //
    },
});

/**
 * Run instance.
 */
myScrollTrigger.init();
