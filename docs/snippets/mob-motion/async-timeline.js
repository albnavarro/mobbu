import { MobTimeline } from '@mobMotion';

const myTimeline = MobTimeline.createAsyncTimeline({
    repeat: -1,
    yoyo: true,
    freeMode: false,
    autoSet: true,
    inheritProps: true,
    forceFromTo: false,
});
