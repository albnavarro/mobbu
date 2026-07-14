myTimeline
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .suspend(() => true)
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' });

/*
 * Play.
 */
myTimeline.play().then(() => {});

/*
 * Resume from suspend
 */
myButton.addEventListener('click', () => {
    myTimeline.resume();
});
