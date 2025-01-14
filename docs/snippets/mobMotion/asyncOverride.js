/**
 * We update the parameters of each instance temporarily,
 * the default values will then be restored when the current action is finished.
 */
myTimeline
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' })
    .goTo(
        mySpring,
        { x: 100, y: 200 },
        { config: 'bounce', configProps: { mass: 10, friction: 2 } }
    )
    .goTo(myTween, { x: 300, y: 0 }, { duration: 1000, ease: 'easeInExpo' })
    .goTo(mySpring, { x: 200, y: 50 }, { config: 'gentle', delay: 100 });
