const target = document.querySelector('target');

const unsubscribe = mySequencer.subscribe(({ x, y }) => {
    target.style.transform = `translate3D(0,0,0) translateX(${x}px) translateY(${y}px)`;
});

const unsubscribeOnComplete = mySequencer.onStop(({ x, y }) => {
    target.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

unsubscribe();
unsubscribeOnComplete();
