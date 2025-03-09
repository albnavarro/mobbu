import { MobScroll, MobTween } from '../../../src/js/mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Use built-in
 */
const myParallaxBuiltin = MobScroll.createParallax({
    item: myTarget,
    propierties: 'x',
    range: 6,
});

myParallaxBuiltin.init();

/**
 * Use a scrollerTween ( sequencer is not supported )
 * Range parameters is unused.
 */
const myTween = MobTween.createScrollerTween({
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

const myParallaxTween = MobScroll.createScrollTrigger({
    item: myTarget, // track position.
    propierties: 'tween', // set this propierties to 'tween'
    tween: myTween, // or a sequencer.
});

myParallaxTween.init();
