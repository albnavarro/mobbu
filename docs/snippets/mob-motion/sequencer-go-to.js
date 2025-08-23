const mySequencer = MobTween.createSequencer({
    data: { x: 0, y: 0, rotate: 0 },
    duration: 10,
    ease: 'easeInQuad',
})
    .goTo({ x: 10 }, { start: 2, end: 5, ease: 'easeInExpo' })
    .goTo({ x: 40 }, { start: 6, end: 10, ease: 'easeInExpo' })
    .goTo({ rotate: () => deg }, { start: 1, end: 9, ease: 'easeInExpo' })
    .goTo({ y: 100 }, {});
