/*
 * Apply set.
 */
myTimeline
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' });
