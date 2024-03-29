/*
 * Apply tweens.
 */
myTimeline
    /**
     * parallael playing.
     * wait all tween is completed.
     */
    .createGroup({ waitComplete: true })
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' })
    .closeGroup()

    /**
     * parallael playing.
     * wait first tween completed.
     */
    .createGroup({ waitComplete: false })
    .goTo(myTween, { x: 300, y: 0 }, { duration: 1000 })
    .goTo(mySpring, { x: 200, y: 50 }, { config: 'gentle', delay: 100 })
    .closeGroup();

/*
 * Play.
 * Resolve after 10 cycle.
 */
myTimeline.play().then(() => {});
