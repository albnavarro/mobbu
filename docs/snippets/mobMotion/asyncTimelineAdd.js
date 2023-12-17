myTimeline
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' })

    /**
     * Custom function
     */
    .add(() => {})

    /**
     *
     */
    .goTo(mySpring, { x: 100, y: 200 }, { config: 'bounce' })

    /**
     * Custom async function
     * wait resolve().
     */
    .addAsync(({ resolve, loop, direction }) => {
        setTimeout(() => {
            resolve();
        }, 300);
    })

    /**
     *
     */
    .goTo(myTween, { x: 300, y: 0 }, { duration: 1000 });

/*
 * Play.
 * Resolve after 10 cycle.
 */
myTimeline.play().then(() => {});
