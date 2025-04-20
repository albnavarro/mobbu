// e.g. tween
myTween.goTo({ x: 10, rotate: 90 }, { duration: 500 }).then(() => {
    //
});

// e.g. spring
mySpring
    .goTo({ x: 10, rotate: (val) => val }, { config: 'wobbly' })
    .then(() => {
        //
    })
    .catch(() => {
        //
    });
