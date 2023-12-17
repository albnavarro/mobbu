/**
 * Add sequencer to timeline.
 */
const mytimeline = timeline
    .createSyncTimeline({
        repeat: -1,
        yoyo: false,
        duration: 4000,
    })
    .add(mySequencer)
    .add(mySequencer2)
    .add(mySequencer3)
    .add(myMasterSequencer);
