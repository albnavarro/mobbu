import { scroller, tween } from '../mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Builtin propierties
 */
const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'x',
    range: '+50vw',
    start: 'bottom',
    end: 'bottom +50vh',
});

/**
 * Use a scrollerTween ( sequencer is supported too )
 * Range parameters is unused.
 */
const myTween = tween.createScrollerTween({
    from: { x: 10, y: 20 },
    to: { x: 40, y: 10 },
    ease: 'easeLinear',
    stagger: {
        each: 10,
    },
});

myTween.subscribe(({ x, y }) => {
    myTarget.style.translate = `${x}px ${y}px`;
});

const myScrollTrigger = scroller.createScrollTrigger({
    item: myTarget,
    propierties: 'tween',
    tween: myTween,
    start: 'bottom',
    end: 'bottom +50vh',
});
