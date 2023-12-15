import { scroller, tween } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Use built-in
 */
const myParallaxBuiltin = scroller.createParallax({
    item: myTarget,
    propierties: 'x',
    range: 6,
});

myParallaxBuiltin.init();

/**
 * Use a scrollerTween ( sequencer is supported too )
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

const myParallaxTween = scroller.createScrollTrigger({
    item: myTarget, // track position.
    propierties: 'tween', // set this propierties to 'tween'
    tween: myTween, // or a sequencer.
});

myParallaxTween.init();
