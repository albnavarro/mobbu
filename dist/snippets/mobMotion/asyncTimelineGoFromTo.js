myTimeline
    .goFromTo(
        myTween,
        { x: 10, y: 10 },
        { x: 10, y: 10 },
        { duration: 2000, delay: 500 }
    )
    .goFromTo(
        mySpring,
        { x: 10, y: 10 },
        { x: 10, y: 10 },
        { config: 'gentle' }
    );
