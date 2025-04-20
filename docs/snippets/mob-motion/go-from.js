// e.g. tween
myTween.goFrom({ x: 10, rotate: 90 }, { duration: 500 }).then(() => {
    //
});

// e.g. spring
mySpring
    .goFrom({ x: 10, rotate: 90 }, { config: 'wobbly' })
    .then(() => {
        //
    })
    .catch(() => {
        //
    });
