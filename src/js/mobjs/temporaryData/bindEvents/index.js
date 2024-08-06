// @ts-check

import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/classVersion/storeType';
import { getRepeaterStateById } from '../../componentStore/action/currentRepeatValue';
import { tick } from '../../componentStore/tick';

/**
 * @type {boolean}
 */
let shouldFireEvent = true;

/**
 * @type {Map<string,Array<{[key:string]: (arg0: object, arg1: object) => {}}>>}
 */
export const bindEventMap = new Map();

/**
 * @param {( import('./type').bindEventsObject|import('./type').bindEventsObject[] )} [ eventsData ]
 * @return {string} props id in store.
 *
 * @description
 * Store props and return a unique identifier
 *
 */
export const setBindEvents = (eventsData = []) => {
    const eventsDataParsed = checkType(Object, eventsData)
        ? [eventsData]
        : eventsData;

    /**
     * @type {string}
     */
    const id = mobCore.getUnivoqueId();
    // @ts-ignore
    bindEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * @param {object} obj
 * @param {HTMLElement|import("../../webComponent/type").userComponent} obj.element
 * @param {string} obj.componentId
 * @param {string} obj.bindEventsId
 * @return {void}
 *
 * @description
 * Store props and return a unique identifier
 *
 */
export const applyBindEvents = ({ element, componentId, bindEventsId }) => {
    const eventArray = bindEventMap.get(bindEventsId);
    if (!eventArray) return;

    eventArray.forEach((event) => {
        const [eventName] = Object.keys(event);
        const [callback] = Object.values(event);

        if (!eventName || !callback) return;

        element.addEventListener(eventName, async (e) => {
            /**
             * Fire one event at time on end of app tick.
             * Set shouldFireEvent to true immediatyle after tick to restore
             * event if callback fail.
             */
            if (!shouldFireEvent) return;
            shouldFireEvent = false;
            await tick();
            shouldFireEvent = true;

            /**
             * Add current repeate list for dynamic list.
             */
            const currentRepeaterState = getRepeaterStateById({
                id: componentId,
            });

            callback(e, currentRepeaterState?.index);
        });
    });

    /**
     * Remove props
     */
    bindEventMap.delete(bindEventsId);
};

/**
 * @return void
 *
 * @description
 * Delete all refs of events.
 * If slot in unused and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansBindEvent = () => {
    bindEventMap.clear();
};
