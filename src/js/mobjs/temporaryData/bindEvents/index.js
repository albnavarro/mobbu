// @ts-check

import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import { getCurrentListValueById } from '../../componentStore/action/currentListValue';

/**
 * @type {Map<String,Array<Object<string,Function>>>}
 */
export const bindEventMap = new Map();

/**
 * @param {Array<String,function>|Object<String,function>} [ eventsData ]
 * @return {String} props id in store.
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
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    bindEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {String} obj.componentId
 * @param {String} obj.bindEventsId
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

        element.addEventListener(eventName, (e) => {
            /**
             * Add current repeate list for dynamic list.
             */
            const currentRepeaterState = getCurrentListValueById({
                id: componentId,
            });

            callback(e, currentRepeaterState);
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
