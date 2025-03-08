import MobAsyncTimeline from './animation/asyncTimeline/AsyncTimeline';
import MobLerp from './animation/lerp/MobLerp';
import MobScroller from './animation/scroller/MobScroller';
import MobScrollerTween from './animation/scroller/MobScrollerTween';
import MobMasterSequencer from './animation/sequencer/MobMasterSequencer';
import MobSequencer from './animation/sequencer/MobSequencer';
import MobSpring from './animation/spring/MobSpring';
import MobSyncTimeline from './animation/syncTimeline/MobSyncTimeline';
import MobTween from './animation/tween/MobTween';

export type MobSpring = InstanceType<typeof MobSpring>;
export type MobleLerp = InstanceType<typeof MobLerp>;
export type MobTween = InstanceType<typeof MobTween>;
export type MobAsyncTimeline = InstanceType<typeof MobAsyncTimeline>;
export type MobSequencer = InstanceType<typeof MobSequencer>;
export type MobSyncTimeline = InstanceType<typeof MobSyncTimeline>;
export type MobScroller = InstanceType<typeof MobScroller>;
export type MobScrollerTween = InstanceType<typeof MobScrollerTween>;
export type MobMasterSequencer = InstanceType<typeof MobMasterSequencer>;
