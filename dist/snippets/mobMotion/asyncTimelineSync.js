myTimeline
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })

    /**
     * copy data from myTween to mySpring.
     */
    .sync({ from: myTween, to: mySpring })

    /**
     * mySpring start from myTween last value.
     */
    .goTo(mySpring, { x: 100, y: 200 }, { config: 'bounce' });

/*
 * Play.
 * Resolve after 10 cycle.
 */
myTimeline.play().then(() => {});
