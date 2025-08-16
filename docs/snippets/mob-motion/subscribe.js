/**
 * One target. subscribe
 */
const target = document.querySelector('target');
const unsunscribe = myTween.subscribe(({ x, y }) => {
    target.style.translate = `${x}px ${y}px`;
});

unsunscribe();

/**
 * Subscribe multiple target ( subscribeCache is preferible )
 */
const targets = document.querySelectorAll('target');
const unsunscribeAll = [...targets].map((item) => {
    return myTween.subscribe(({ x, y }) => {
        item.style.translate = `${x}px ${y}px`;
    });
});

unsunscribeAll.forEach((unsubscribe) => unsubscribe());
