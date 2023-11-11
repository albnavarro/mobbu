import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import { ATTR_WEAK_BIND_EVENTS } from '../../constant';

export const weakBindEventMap = new Map();
export const eventDelegationMap = new WeakMap();
const eventToAdd = new Set();
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
    const elements = parent.querySelectorAll(`[${ATTR_WEAK_BIND_EVENTS}]`);

    /**
     * Create event object associated to DOM element.
     */
    [...elements].forEach((element) => {
        const id = element.getAttribute(ATTR_WEAK_BIND_EVENTS);
        element.removeAttribute(ATTR_WEAK_BIND_EVENTS);
        const data = weakBindEventMap.get(id);
        weakBindEventMap.delete(id);

        const dataParsed = data.flatMap((item) => {
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
            if (!item || !document.contains(target)) return;

            const currentEvent = item.find(({ event }) => event === eventKey);
            if (!currentEvent) return;

            const { callback } = currentEvent;
            callback(event);
        });
    }
};
