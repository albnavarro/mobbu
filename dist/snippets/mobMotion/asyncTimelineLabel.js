myTimeline
    .goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 })
    .label('myLabel')
    .goTo(mySpring, { x: 10, y: 10 }, { config: 'gentle' });

/*
 * Play from label.
 */
myTimeline.playFrom('myLabel').then(() => {});
