//@ts-check

import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/classVersion/storeType';
import { getRepeaterStateById } from '../../componentStore/action/currentRepeatValue';
import { getIdByElement } from '../../componentStore/action/element';
import { tick } from '../../componentStore/tick';
import { invalidateTick } from '../../componentStore/tickInvalidate';
import { repeaterTick } from '../../componentStore/tickRepeater';
import {
    ATTR_WEAK_BIND_EVENTS,
    DEFAULT_CURRENT_REPEATER_STATE,
} from '../../constant';
import { getRoot } from '../../mainStore/root';

/**
 * @type {boolean}
 */
let shouldFireEvent = true;

/**
 * @type {Map<string,Array<{[key:string]: () => void}>>}
 */
export const tempDelegateEventMap = new Map();

/**
 * @type {WeakMap<object,import('./type').weakBindEventsDataArray | undefined>}
 */
export const eventDelegationMap = new WeakMap();

/**
 * @type {string[]}
 */
const eventToAdd = [];

/**
 * @type {string[]}
 */
const eventRegistered = [];

/**
 * @param {( import('./type').delegateEventObject|import('./type').delegateEventObject[] )} [ eventsData ]
 * @return {string} props id in store.
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
     * @type {string}
     */
    const id = mobCore.getUnivoqueId();
    // @ts-ignore
    tempDelegateEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * @param {EventTarget|undefined} target
 * @returns {{ target:EventTarget|undefined,data:import('./type').weakBindEventsDataArray | undefined}}
 */
const findParentElementInMap = (target) => {
    // @ts-ignore
    let parent = target?.parentNode;

    while (parent) {
        if (eventDelegationMap.has(parent))
            return { target: parent, data: eventDelegationMap.get(parent) };
        parent = parent?.parentNode;
    }

    return { target: undefined, data: undefined };
};

/**
 * @param {EventTarget} target
 * @returns {{ target:EventTarget|undefined,data:import('./type').weakBindEventsDataArray | undefined}}
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
 * @returns {Promise<void>}
 */
async function handleAction(eventKey, event) {
    const target = event?.target;
    if (!target) return;

    /**
     * Fire one event at time on end of app tick.
     * Set shouldFireEvent to true immediatyle after tick to restore
     * event if callback fail.
     */
    if (!shouldFireEvent) return;
    shouldFireEvent = false;
    await tick();
    shouldFireEvent = true;

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
    callback(event, currentRepeaterState?.index);
}

/**
 * @param {HTMLElement} root
 * @return { Promise<any> }
 *
 * @description
 * Store props and return a unique identifier
 *
 */
export const applyDelegationBindEvent = async (root) => {
    /**
     * Await end of current reactive things ( bindpros/repeaters/invalidate )
     */
    await repeaterTick();
    await invalidateTick();

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
