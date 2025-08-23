const mySequencer = tween
    .createSequencer({
        data: { x: 10, y: 0, rotate: 0 },
        duration: 10,
        ease: 'easeInQuad',
    })
    .goFromTo({ x: 0 }, { x: 100 }, { start: 2, end: 5, ease: 'easeInExpo' });
