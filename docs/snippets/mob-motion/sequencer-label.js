import { MobTimeline, MobTween } from '@mobMotion';

/**
 * Create and set the goTo value.
 */
const mySequencer = MobTween.createSequencer({
    data: { x: 10, y: 0, rotate: 0 },
    duration: 10,
    ease: 'easeInQuad',
})
    .goTo({ x: 10 }, { start: 2, end: 5, ease: 'easeInExpo' })
    .label('myLabel', 4);

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
 * Play timeline from label.
 */
mytimeline.playFrom('myLabel');
