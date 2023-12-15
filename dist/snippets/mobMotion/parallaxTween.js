import { scroller, tween } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Use a scrollerTween ( sequencer is not supported )
 * Range parameters is unused.
 */
const myTween = tween.createScrollerTween({
    from: { x: 10, y: 20 }, // exact value.
    to: { x: 100, y: 200 }, // multiplier.
    ease: 'easeLinear',
    stagger: {
        each: 10,
    },
});

myTween.subscribe(({ x, y }) => {
    myTarget.style.translate = `${x}px ${y}px`;
});

const myParallax = scroller.createScrollTrigger({
    item: myTarget, // track position.
    propierties: 'tween', // set this propierties to 'tween'
    tween: myTween, // or a sequencer.
});

myParallax.init();
