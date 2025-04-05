import { MobTimeline, MobTween } from '@mobMotion';

/**
 * Complete example:
 */

const target = document.querySelector('target');
let deg = 90;

/**
 * Create and set the goTo value.
 */
const mySequencer = MobTween.createSequencer({
    data: { x: 0, y: 0, rotate: 0 },
    duration: 10,
    ease: 'easeInQuad',
})
    .goTo({ x: 10 }, { start: 2, end: 5, ease: 'easeInExpo' })
    .goTo({ x: 40 }, { start: 6, end: 10, ease: 'easeInExpo' })
    .goTo({ rotate: () => deg }, { start: 1, end: 9, ease: 'easeInExpo' })
    .goTo({ y: 100 }, {});

/**
 * Subscribe
 */
const unsunscribe = mySequencer.subscribe(({ x, y, rotate }) => {
    target.style.translate = `${x}px ${y}px`;
    target.style.rotate = `${rotate}deg`;
});

/**
 * Add sequencer to timeline.
 */
const mytimeline = MobTimeline.createSyncTimeline({
    repeat: -1,
    yoyo: false,
    duration: 4000,
}).add(mySequencer);

/**
 * Play timeline.
 */
mytimeline.play();
