const targets = document.querySelectorAll('target');
const unsunscribeAll = [...targets].map((item) => {
    return myTween.subscribeCache(item, ({ x, y }) => {
        item.style.translate = `${x}px ${y}px`;
    });
});

unsunscribeAll.forEach((unsubscribe) => unsubscribe());
