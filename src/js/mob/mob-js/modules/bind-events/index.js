import { MobCore } from '../../../mob-core';
import { setBindEventsById } from '../../component/action/bind-events';
import { getRepeaterStateById } from '../../component/action/repeater';
import { tick } from '../../queque/tick';
import {
    allowFireEvent,
    getFireEvent,
    preventFireEvent,
} from '../common-event';

/**
 * @type {Map<string, [string, (event: Event, value: any, index: number) => void][]>}
 */
export const bindEventMap = new Map();

/**
 * Store props and return a unique identifier
 *
 * @param {import('./type').BindEventsObject<Event>} [eventsData]
 * @returns {string} Props id in store.
 */
export const setBindEvents = (eventsData = {}) => {
    const eventsDataParsed = Object.entries(eventsData);
    const id = MobCore.getUnivoqueId();
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

    /**
     * Bind all Event to component root element
     */
    const handlers = eventArray.flatMap(([eventName, callback]) => {
        if (!eventName || !callback) return [];

        const handler = async (/** @type {Event} */ event) => {
            /**
             * Fire one event at time on end of app tick.
             *
             * - Set shouldFireEvent to true immediatyle after tick to restore event if callback fail.
             * - If route is loading skip action
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
                event,
                currentRepeaterState?.current,
                currentRepeaterState?.index
            );
        };

        element.addEventListener(eventName, handler);

        return [
            {
                eventName,
                handler,
            },
        ];
    });

    /**
     * Store event handler in component map.
     *
     * - On destroy removeListener
     */
    setBindEventsById({ id: componentId, handlers });

    /**
     * Remove props
     */
    bindEventMap.delete(bindEventsId);
};

/**
 * Delete all refs of events. If slot in unused and a propsFromStore is unused remain in store So when active parser
 * counter is equal 0 ( no parser is running ) remove all reference
 *
 * @returns {void}
 */
export const removeOrphansBindEvent = () => {
    bindEventMap.clear();
};
