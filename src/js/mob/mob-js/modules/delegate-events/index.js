import { MobCore } from '../../../mob-core';
import { checkType } from '../../../mob-core/store/store-type';
import { getRepeaterStateById } from '../../component/action/repeater';
import { getIdByElement } from '../../component/action/element';
import { tick } from '../../queque/tick';
import { invalidateTick } from '../../queque/tick-invalidate';
import { repeaterTick } from '../../queque/tick-repeater';
import {
    ATTR_WEAK_BIND_EVENTS,
    DEFAULT_CURRENT_REPEATER_STATE,
} from '../../constant';
import { getRoot } from '../../route/dom-ref/root';
import {
    allowFireEvent,
    getFireEvent,
    preventFireEvent,
} from '../common-event';
import { mainStore } from '../../modules';
import { MAIN_STORE_ROUTE_IS_LOADING } from '../../main-store/constant';

/**
 * @type {Map<string, { [key: string]: () => void }[]>}
 */
export const tempDelegateEventMap = new Map();

/**
 * @type {WeakMap<object, import('./type').WeakBindEventsDataArray | undefined>}
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
 * Store props and return a unique identifier
 *
 * @param {import('./type').DelegateEventObject<Event> | import('./type').DelegateEventObject<Event>[]} [eventsData]
 * @returns {string} Props id in store.
 */
export const setDelegateBindEvent = (eventsData = []) => {
    const eventsDataParsed = checkType(Object, eventsData)
        ? [eventsData]
        : eventsData;

    /**
     * @type {string}
     */
    const id = MobCore.getUnivoqueId();
    // @ts-ignore
    tempDelegateEventMap.set(id, eventsDataParsed);

    return id;
};

/**
 * @param {EventTarget | undefined} target
 * @returns {{ target: EventTarget | undefined; data: import('./type').WeakBindEventsDataArray | undefined }}
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
 * @returns {{ target: EventTarget | undefined; data: import('./type').WeakBindEventsDataArray | undefined }}
 */
const getItemFromTarget = (target) => {
    const data = eventDelegationMap.get(target);
    if (data) return { target, data: eventDelegationMap.get(target) };

    /**
     * Wall up DOM tree searcing first element in map. If event.target is inside element where eventi is applied.
     */
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
     *
     * - Set shouldFireEvent to true immediatyle after tick to restore event if callback fail.
     * - If route is loading skip action
     */
    if (!getFireEvent() || mainStore.getProp(MAIN_STORE_ROUTE_IS_LOADING))
        return;

    preventFireEvent();
    await tick();
    allowFireEvent();

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
     * Replace target with new target ( parent of original target if event.tatget is inside )
     */
    Object.defineProperty(event, 'target', { value: targetParsed });
    Object.defineProperty(event, 'currentTarget', { value: target });

    /**
     * Fire callback.
     */
    callback(event, currentRepeaterState?.current, currentRepeaterState?.index);
}

/**
 * Store props and return a unique identifier
 *
 * @param {HTMLElement} root
 * @returns {Promise<any>}
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
