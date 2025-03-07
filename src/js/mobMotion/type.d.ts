import HandleAsyncTimeline from './animation/asyncTimeline/handleAsyncTimeline';
import HandleLerp from './animation/lerp/handleLerp';
import HandleScroller from './animation/scroller/HandleScroller';
import HandleScrollerTween from './animation/scroller/HandleTweenTween';
import HandleMasterSequencer from './animation/sequencer/handleMasterSequencer';
import HandleSequencer from './animation/sequencer/handleSequencer';
import HandleSpring from './animation/spring/handleSpring';
import HandleSyncTimeline from './animation/syncTimeline/handleSyncTimeline';
import HandleTween from './animation/tween/handleTween';

export type HandleSpring = InstanceType<typeof HandleSpring>;
export type HandleLerp = InstanceType<typeof HandleLerp>;
export type HandleTween = InstanceType<typeof HandleTween>;
export type HandleAsyncTimeline = InstanceType<typeof HandleAsyncTimeline>;
export type HandleSequencer = InstanceType<typeof HandleSequencer>;
export type HandleSyncTimeline = InstanceType<typeof HandleSyncTimeline>;
export type HandleScroller = InstanceType<typeof HandleScroller>;
export type HandleScrollerTween = InstanceType<typeof HandleScrollerTween>;
export type HandleMasterSequencer = InstanceType<typeof HandleMasterSequencer>;
