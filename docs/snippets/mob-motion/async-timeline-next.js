/*
 * Apply tweens.
 */
myTimeline
    .goTo(mySpring, { x: 100, y: 200 }, { config: 'bounce' })
    .goTo(mySpring, { x: 20, y: 20 })
    .goTo(mySpring, { x: 5 })
    .goTo(mySpring, { x: 10, y: 100 });

/*
 * Play.
 */
myTimeline.play().then(() => {});

/*
 * Reverse as soon current promise is resolved.
 */
myButton.addEventListener('click', () => {
    myTimeline.reverseNext();
});
