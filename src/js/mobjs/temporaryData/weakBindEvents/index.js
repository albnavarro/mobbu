//@ts-check

import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import { getRepeaterStateById } from '../../componentStore/action/currentRepeatValue';
import { getIdByElement } from '../../componentStore/action/element';
import {
    ATTR_WEAK_BIND_EVENTS,
    DEFAULT_CURRENT_REPEATER_STATE,
} from '../../constant';
import { getRoot } from '../../mainStore/root';

/**
 * @type {Map<String,Array<Object<string,Function>>>}
 */
export const tempDelegateEventMap = new Map();

/**
 * @type {WeakMap<Object,Array<String,function>|Object<String,function>>}
 */
export const eventDelegationMap = new WeakMap();

/**
 * @type {Array<string>}
 */
const eventToAdd = [];

/**
 * @type {Array<string>}
 */
const eventRegistered = [];

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
    tempDelegateEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * @param {EventTarget|null} target
 * @returns {{ target:EventTarget|null,data:Array<String,function>|Object<String,function> }}
 */
const findParentElementInMap = (target) => {
    // @ts-ignore
    let parent = target?.parentNode;

    while (parent) {
        if (eventDelegationMap.has(parent))
            return { target: parent, data: eventDelegationMap.get(parent) };
        parent = parent?.parentNode;
    }

    return { target: null, data: null };
};

/**
 * @param {EventTarget|null} target
 * @returns {{ target:EventTarget|null,data:Array<String,function>|Object<String,function> }}
 */
const getItemFromTarget = (target) => {
    const data = eventDelegationMap.get(target);

    if (data) return { target, data: eventDelegationMap.get(target) };

    /**
     * Wall up DOM tree searcing first element in map.
     * If event.target is inside element where eventi is applied.
     **/
    return findParentElementInMap(target);
};

/**
 * @param {string} eventKey
 * @param {Event} event
 * @returns {void}
 */
function handleAction(eventKey, event) {
    const target = event.target;

    const { target: targetParsed, data } = getItemFromTarget(target);

    // @ts-ignore
    if (!data || !document.contains(targetParsed)) return;

    const currentEvent = data.find(({ event }) => event === eventKey);
    if (!currentEvent) return;

    /**
     * Get callback.
     */
    const { callback } = currentEvent;

    /**
     * Get current repeater state if target is a component.
     */
    // @ts-ignore
    const componentId = getIdByElement({ element: targetParsed });
    const currentRepeaterState = componentId
        ? getRepeaterStateById({
              id: componentId,
          })
        : DEFAULT_CURRENT_REPEATER_STATE;

    /**
     * Replace target with new target
     * ( parent of original target if event.tatget is inside )
     */
    Object.defineProperty(event, 'target', { value: targetParsed });

    /**
     * Fire callback.
     */
    callback(event, currentRepeaterState);
}

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
        const data = tempDelegateEventMap.get(id);
        tempDelegateEventMap.delete(id);

        const dataParsed = data?.flatMap((item) => {
            return Object.entries(item).map((current) => {
                const [event, callback] = current;
                if (!eventToAdd.includes(event)) eventToAdd.push(event);
                return { event, callback };
            });
        });

        eventDelegationMap.set(element, dataParsed);
    });

    const rootElement = getRoot();

    /**
     * Cycle all event and add a click if needed.
     */
    eventToAdd.forEach((eventKey) => {
        if (eventRegistered.includes(eventKey)) return;
        eventRegistered.push(eventKey);

        rootElement.addEventListener(
            eventKey,
            handleAction.bind(null, eventKey)
        );
    });
};
