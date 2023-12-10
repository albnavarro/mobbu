/*
 * Apply tweens.
 */
myTimeline
    .goTo(mySpring, { x: 100, y: 200 }, { config: 'bounce' })
    .reverseNext()
    .goTo(mySpring, { x: 20, y: 20 });

/*
 * Play.
 * Resolve after 10 cycle.
 */
myTimeline.play().then(() => {});
