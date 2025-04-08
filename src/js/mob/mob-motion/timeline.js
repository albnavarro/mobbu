// @ts-check

import MobAsyncTimeline from './animation/async-timeline/async-timeline.js';
import MobSyncTimeline from './animation/sync-timeline/mob-sync-timeline.js';

/**
 * @param {import('./animation/sync-timeline/type.js').SyncTimeline} data
 * @return {MobSyncTimeline}
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const myTimeline = MobTimeline.createSyncTimeline({
 *   duration: [ Number ],
 *   yoyo: [ Boolean ],
 *   repeat: [ Number ]
 * })
 *
 *
 * ```
 *
 * @description
 * Available methods:
 * ```javascript
 * myTimeline.add()
 * myTimeline.onLoopEnd()
 * myTimeline.onComplete()
 * myTimeline.onUpdate()
 * myTimeline.stop()
 * myTimeline.play()
 * myTimeline.playReverse()
 * myTimeline.playFrom()
 * myTimeline.playFromReverse()
 * myTimeline.reverse()
 * myTimeline.pause()
 * myTimeline.resume()
 * myTimeline.isActive()
 * myTimeline.isPaused()
 * myTimeline.getDirection()
 * myTimeline.getTime()
 * myTimeline.destroy()
 * ```
 */
function createSyncTimeline(data) {
    return new MobSyncTimeline(data);
}

/**
 * @param {import('./animation/async-timeline/type.js').AsyncTimeline} data
 * @return {MobAsyncTimeline}
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const myTimeline = MobTimeline.createAsyncTimeline({
 *   yoyo: [ Boolean ],
 *   repeat: [ Number ],
 *   freeMode: [ Number ],
 *   autoSet: [ Number ],
 * })
 *
 *
 * ```
 *
 * @description
 * Available methods:
 * ```javascript
 *
 *
 * `Methods to create timeline`
 * myTimeline.set()
 * myTimeline.goTo()
 * myTimeline.goFrom()
 * myTimeline.goFromTo()
 * myTimeline.add()
 * myTimeline.addAsync()
 * myTimeline.sync()
 * myTimeline.createGroup()
 * myTimeline.closeGroup()
 * myTimeline.suspend()
 * myTimeline.label()
 *
 *
 * `Methods to control timeline`
 * myTimeline.play()
 * myTimeline.playFromLabel()
 * myTimeline.playFrom()
 * myTimeline.playFromReverse()
 * myTimeline.playReverse()
 * myTimeline.reverseNext()
 * myTimeline.stop()
 * myTimeline.pause()
 * myTimeline.resume()
 * myTimeline.isActive()
 * myTimeline.isPaused()
 * myTimeline.isSuspended()
 * myTimeline.getDirection()
 * myTimeline.setTween()
 * myTimeline.get()
 * myTimeline.onLoopEnd()
 * myTimeline.onComplete()
 * myTimeline.destroy()
 * ```
 */
function createAsyncTimeline(data) {
    return new MobAsyncTimeline(data);
}

export { createAsyncTimeline, createSyncTimeline };
