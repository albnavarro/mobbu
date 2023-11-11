//@ts-check

import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import { getCurrentListValueById } from '../../componentStore/action/currentListValue';
import { getIdByElement } from '../../componentStore/action/element';
import {
    ATTR_WEAK_BIND_EVENTS,
    DEFAULT_CURRENT_REPEATER_STATE,
} from '../../constant';

/**
 * @type {Map<String,Array<Object<string,Function>>>}
 */
export const weakBindEventMap = new Map();

/**
 * @type {WeakMap<Object,Array<String,function>|Object<String,function>>}
 */
export const eventDelegationMap = new WeakMap();

/**
 * @type {Set<string>}
 */
const eventToAdd = new Set();

/**
 * @type {Set<string>}
 */
const eventRegistered = new Set();

/**
 * @param {Array<String,function>|Object<String,function>} [ eventsData ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique identifier
 *
 */
export const setDelegateBindEvent = (eventsData = []) => {
    const eventsDataParsed = checkType(Object, eventsData)
        ? [eventsData]
        : eventsData;

    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    weakBindEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * @param {HTMLElement} root
 * @return { void }
 *
 * @description
 * Store props and return a unique identifier
 *
 */
export const applyDelegationBindEvent = (root) => {
    /**
     * Get parent node of root ( root of parseComponentRecursive ).
     */
    const parent = root.parentNode;
    const elements =
        parent?.querySelectorAll(`[${ATTR_WEAK_BIND_EVENTS}]`) ?? [];

    /**
     * Create event object associated to DOM element.
     */
    [...elements].forEach((element) => {
        const id = element.getAttribute(ATTR_WEAK_BIND_EVENTS) ?? '';
        element.removeAttribute(ATTR_WEAK_BIND_EVENTS);
        const data = weakBindEventMap.get(id);
        weakBindEventMap.delete(id);

        const dataParsed = data?.flatMap((item) => {
            return Object.entries(item).map((current) => {
                const [event, callback] = current;
                eventToAdd.add(event);
                return { event, callback };
            });
        });

        eventDelegationMap.set(element, dataParsed);
    });

    /**
     * Cycle all event and add a click if needed.
     */
    for (const eventKey of eventToAdd) {
        if (eventRegistered.has(eventKey)) break;
        eventRegistered.add(eventKey);

        document.addEventListener(eventKey, (event) => {
            const target = event.target;

            const item = eventDelegationMap.get(target);
            // @ts-ignore
            if (!item || !document.contains(target)) return;

            const currentEvent = item.find(({ event }) => event === eventKey);
            if (!currentEvent) return;

            const { callback } = currentEvent;

            /**
             * Get current repeater state if target is a component.
             */
            // @ts-ignore
            const componentId = getIdByElement({ element: target });
            const currentRepeaterState = componentId
                ? getCurrentListValueById({
                      id: componentId,
                  })
                : DEFAULT_CURRENT_REPEATER_STATE;

            /**
             * Fire callback.
             */
            callback(event, currentRepeaterState);
        });
    }
};
