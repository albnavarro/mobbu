import { MobScroll, MobTween } from '@mobMotion';

const myTarget = document.querySelector('myTarget');

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

const myParallax = MobScroll.createScrollTrigger({
    item: myTarget, // track position.
    propierties: 'tween', // set this propierties to 'tween'
    tween: myTween, // or a sequencer.
});

myParallax.init();
