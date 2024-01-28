// @ts-check

import { getUnivoqueId } from '../../utils';
import { eventStore } from '../eventStore';

/**
 * @type {Number}
 *
 * @description
 * Increment and decrement when we add or fire a item.
 * hadleFrame use that to check if the requestAnimationFrame have to go on.
 * Indeicate fi there is frame to render.
 */
let cacheCoutner = 0;

/**
 * @type {Map.<string, { el: (Object|HTMLElement), fn: Function, data: Map.<number, Object> }>}
 */
const subscriberMap = new Map();

/**
 * @param {Object|HTMLElement} el
 * @param {Function} fn
 * @returns {{id:string,unsubscribe:function():void}}
 *
 * @description
 * Add new item to cache.
 */
const add = (el = {}, fn = () => {}) => {
    const id = getUnivoqueId();

    subscriberMap.set(id, {
        el,
        fn,
        data: new Map(),
    });

    return {
        id,
        unsubscribe: () => {
            if (subscriberMap.has(id)) {
                /*
                 * When we remove some items before fired we have to update the
                 * cachecounter so handleFrame can stop
                 */
                const item = subscriberMap.get(id);
                if (!item) return;

                const frameToSubstract = item.data.size;
                subscriberMap.delete(id);
                if (!frameToSubstract) return;

                cacheCoutner = cacheCoutner - frameToSubstract;
            }
        },
    };
};

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @param {Object} obj.callBackObject
 * @param {Number} obj.frame
 * @returns void
 *
 * @description
 * Add new data on existing id in a specific frame.
 */
const update = ({ id, callBackObject, frame }) => {
    if (!subscriberMap.has(id)) return;

    const { currentFrame } = eventStore.get();
    const item = subscriberMap.get(id);

    if (!item?.data) return;
    const { data } = item;

    data.set(frame + currentFrame, callBackObject);
    cacheCoutner++;
};

/**
 * @memberof module:handleCache
 * @param {string} id
 * @returns void
 *
 * @description
 * Remove item from cache.
 */
const remove = (id) => {
    if (subscriberMap.has(id)) subscriberMap.delete(id);
};

/**
 * @param {string} id
 * @returns void
 *
 * @description
 * Reset item data
 */
const clean = (id) => {
    const el = subscriberMap.get(id);
    if (!el) return;

    /*
     * When we remove some items before fired we have to update the
     * cachecounter so handleFrame can stop
     */
    const frameToSubstract = el.data.size;
    cacheCoutner = cacheCoutner - frameToSubstract;
    el.data.clear();
};

/**
 * @memberof module:handleCache
 * @param {string} id
 * @returns {Object.<number, { el: (Object|HTMLElement), fn: Function, data: Object.<number, Object> }>}
 *
 * @description
 * Get item object
 */
const get = (id) => {
    return subscriberMap.get(id) ?? {};
};

/**
 * @param {Number} frameCounter - frame to render.
 * @param {Boolean} shouldRender - should render.
 * @returns void
 *
 * @description
 * Render obj on specific frame and delete rendered object.
 */
const fire = (frameCounter, shouldRender) => {
    for (const value of subscriberMap.values()) {
        const { data, fn, el } = value;
        const callBackObject = data.get(frameCounter);

        if (callBackObject) {
            if (shouldRender) {
                fn(callBackObject, el);
            }

            data.delete(frameCounter);
            cacheCoutner--;
        }
    }

    console.log(subscriberMap.size);
};

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @param {Object} obj.obj
 * @returns void
 *
 * @description
 * Render immediately obj using existing id/function
 */
const fireObject = ({ id, obj = {} }) => {
    if (!subscriberMap.has(id)) return;

    const item = subscriberMap.get(id);
    if (!item) return;

    const { el, fn } = item;
    fn(obj, el);
};

/**
 * @returns {Number}
 *
 * @description
 * Get current number of frame to render.
 */
const getCacheCounter = () => cacheCoutner;

/**
 * @param {Number} maxFramecounter
 *
 * @description
 * When frameCounter become too big reset and recalculate all the frame values.
 */
const updateFrameId = (maxFramecounter) => {
    for (const [key, value] of subscriberMap) {
        const { data, fn, el } = value;

        const newMap = new Map();
        for (const [frame, object] of data) {
            newMap.set(frame - maxFramecounter, object);
            data.delete(frame);
        }

        subscriberMap.set(key, { data: newMap, fn, el });
    }
};

/**
 * @description
 * @module handleCache
 */
export const handleCache = (() => {
    return {
        add,
        get,
        update,
        remove,
        clean,
        fire,
        fireObject,
        getCacheCounter,
        updateFrameId,
    };
})();
