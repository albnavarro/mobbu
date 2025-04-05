import { MobTween, MobTimeline } from '@mobMotion';

const masterSequencer = MobTween.createMasterSequencer();

masterSequencer.add(sequencer1);
masterSequencer.add(sequencer2);
masterSequencer.add(sequencer3);

/**
 * Add masterSequencer to timeline.
 */
const mytimeline = MobTimeline.createSyncTimeline({
    repeat: -1,
    yoyo: false,
    duration: 4000,
}).add(masterSequencer);

/**
 * Play timeline.
 */
mytimeline.play();
