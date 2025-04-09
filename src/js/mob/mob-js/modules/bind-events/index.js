// @ts-check

import { MobCore } from '../../../mob-core';
import { checkType } from '../../../mob-core/store/store-type';
import { getRepeaterStateById } from '../../component/action/repeater';
import { tick } from '../../queque/tick';
import {
    allowFireEvent,
    getFireEvent,
    preventFireEvent,
} from '../common-event';

/**
 * @type {Map<string, { [key: string]: (arg0: object, arg1: Record<string, any>, arg2: number) => {} }[]>}
 */
export const bindEventMap = new Map();

/**
 * Store props and return a unique identifier
 *
 * @param {import('./type').BindEventsObject<Event> | import('./type').BindEventsObject<Event>[]} [eventsData]
 * @returns {string} Props id in store.
 */
export const setBindEvents = (eventsData = []) => {
    const eventsDataParsed = checkType(Object, eventsData)
        ? [eventsData]
        : eventsData;

    /**
     * @type {string}
     */
    const id = MobCore.getUnivoqueId();
    // @ts-ignore
    bindEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * Store props and return a unique identifier
 *
 * @param {object} obj
 * @param {HTMLElement | import('../../web-component/type').UserComponent} obj.element
 * @param {string} obj.componentId
 * @param {string} obj.bindEventsId
 * @returns {void}
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
             * Fire one event at time on end of app tick. Set shouldFireEvent to true immediatyle after tick to restore
             * event if callback fail.
             */
            if (!getFireEvent()) return;
            preventFireEvent();
            await tick();
            allowFireEvent();

            /**
             * Add current repeate list for dynamic list.
             */
            const currentRepeaterState = getRepeaterStateById({
                id: componentId,
            });

            callback(
                e,
                currentRepeaterState?.current,
                currentRepeaterState?.index
            );
        });
    });

    /**
     * Remove props
     */
    bindEventMap.delete(bindEventsId);
};

/**
 * Delete all refs of events. If slot in unused and a propsFromStore is unused remain in store So when active parser
 * counter is equal 0 ( no parser is running ) remove all reference
 *
 * @returns Void
 */
export const removeOrphansBindEvent = () => {
    bindEventMap.clear();
};
