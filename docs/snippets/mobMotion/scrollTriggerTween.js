import { MobScroll, MobTween } from '@mobMotion';

const myTarget = document.querySelector('myTarget');

/**
 * Use a scrollerTween ( sequencer is supported too )
 * Range parameters is unused.
 * from 10px to 40px om x axis
 * from 20px to 10px om y axis
 */
const myTween = MobTween.createScrollerTween({
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

const myScrollTrigger = MobScroll.createScrollTrigger({
    item: myTarget, // track position.
    propierties: 'tween', // set this propierties to 'tween'
    tween: myTween, // or a sequencer.
    // no range parameters needed.
    start: 'bottom',
    end: 'bottom +50vh',
});

myScrollTrigger.init();
