import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import {
    ATTR_WEAK_BIND_EVENTS,
    ATTR_WEAK_BIND_EVENTS_PARTIAL,
} from '../../constant';

export const weakBindEventMap = new Map();
export const eventDelegationMap = new WeakMap();
const eventToAdd = new Set();
// const eventRegistered = new Set();

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
    const parent = root.parentNode;
    const elements = parent.querySelectorAll(`[${ATTR_WEAK_BIND_EVENTS}]`);

    [...elements].forEach((element) => {
        const id = element.dataset[ATTR_WEAK_BIND_EVENTS_PARTIAL];
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
        console.log(eventToAdd);
    });
};
