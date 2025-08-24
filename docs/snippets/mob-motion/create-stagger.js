import { MobTimeline, MobTween, MobScroll } from '@mobMotion';

const triggerElement = document.querySelector('.trigger');
const targets = document.querySelectorAll('.targets');

/**
 * Let's create a masterSequencer to group all the instances.
 */
const masterSequencer = MobTween.createMasterSequencer();

/**
 * CreateStagger.
 */
const staggers = MobTween.createStaggers({
    items: targets,
    stagger: {
        type: 'end',
        each: 5,
        from: 'start',
        grid: { col: 10, row: 10, direction: 'col' },
        waitComplete: false,
    },
    duration: 10,
});

/**
 * Create All instance of sequencer. If you don't need to keep track of the unsubscribe functions, a simple forEach() is
 * enough
 */
const unsubScribeStagger = staggers.map(({ item, start, end, index }) => {
    const sequencer = MobTween.createSequencer({
        data: { x: 0, y: 0 },
        duration: 10, // duration is the same of createStagger
        ease: 'easeInQuad',
    }).goTo({ x: 10, y: 10 }, { start, end });

    /**
     * Apply value
     */
    const unsunscribe = sequencer.subscribe(({ x, y }) => {
        item.style.transform = `translate(${x}px ${y}px)`;
    });

    /**
     * Add to masterSequencer
     */
    masterSequencer.add(sequencer);
    return unsunscribe;
});

/**
 * Timeline example:
 */
const mytimeline = MobTimeline.createSyncTimeline({
    repeat: -1,
    yoyo: false,
    duration: 4000,
}).add(masterSequencer);

mytimeline.play();

/**
 * Scrolltrigger example:
 */
const scrollerInstance = MobScroll.createScrollTrigger({
    trigger: triggerElement,
    propierties: 'tween',
    tween: masterSequencer,
    dynamicStart: {
        position: 'bottom',
        value: () => 0,
    },
    dynamicEnd: {
        position: 'bottom',
        value: () => outerHeight(triggerElement),
    },
    ease: true,
    easeType: 'lerp',
});

scrollerInstance.init();
