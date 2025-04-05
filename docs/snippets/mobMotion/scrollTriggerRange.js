import { MobScroll } from '@mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Builtin propierties
 */
const myScrollTrigger = MobScroll.createScrollTrigger({
    item: myTarget,
    propierties: 'x',
    range: '+50vw',

    // from 0 to 15 deg.
    // propierties: 'rotateY',
    // range: '+15deg',

    // opacity from 1 to 0.
    // propierties: 'opacity',
    // range: '-1',

    // scale from 1 to 1.5
    // propierties: 'scale',
    // range: '0.5',

    start: 'bottom',
    end: 'bottom +50vh',
});

myScrollTrigger.init();
