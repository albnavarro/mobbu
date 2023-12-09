/**
 * One target.
 * subscribe
 */
const target = document.querySelector('target');
const unsunscribe = mySequencer.subscribe(({ x, y }) => {
    target.style.translate = `${x}px ${y}px`;
});

unsunscribe();

/**
 * Multiple target.
 * subscribe
 */
const targets = document.querySelectorAll('target');
const unsunscribeAll = [...targets].map((item) => {
    return mySequencer.subscribe(({ x, y }) => {
        item.style.translate = `${x}px ${y}px`;
    });
});

unsunscribeAll.forEach((unsubscribe) => unsubscribe());
