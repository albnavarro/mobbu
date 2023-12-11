import { timeline } from '../../../src/js/mobMotion';

const myTimeline = timeline.createSyncTimeline({
    duration: 3000,
    yoyo: true,
    repeat: -1,
});
