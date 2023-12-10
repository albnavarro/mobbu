const unsubscribeOnLoopEnd = myTimeline.onLoopEnd(({ loop, direction }) => {
    /// code
});
unsubscribeOnLoopEnd();

const unsubscribeOnComplete = myTimeline.onComplete(() => {
    /// code
});
unsubscribeOnComplete();
