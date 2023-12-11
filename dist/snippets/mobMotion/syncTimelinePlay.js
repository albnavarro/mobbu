/**
 * Play timeline.
 */
mytimeline.play({ useCurrent: true }).then(() => {});

/**
 * Play reverse timeline.
 */
mytimeline.playReverse({ useCurrent: true }).then(() => {});

/**
 * Stop timeline.
 */
mytimeline.stop({ clearCache: true });
