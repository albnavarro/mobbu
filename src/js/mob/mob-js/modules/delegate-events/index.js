import { MobCore } from '../../../mob-core';
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

const FORCE_EVENT = ':FORCE';

/**
 * Track data to initialize module.
 *
 * @type {Map<string, [string, (event: Event, value: any, index: number) => void][]>}
 */
export const tempDelegateEventMap = new Map();

/**
 * Track all target ref for fast event target detection
 *
 * @type {WeakMap<object, import('./type').WeakBindEventsDataArray | undefined>}
 */
export const eventDelegationMap = new WeakMap();

/**
 * Track all target ref When all target related to a specific event is disconnected from DOM remove event.
 *
 * @type {Map<string, WeakRef<Element>[]>}
 */
const eventTargetRefs = new Map();

/**
 * Track all active hanndlers
 *
 * @type {Map<string, (arg0: any) => void>}
 */
const activeHandlers = new Map(); // eventKey -> boundHandler

/**
 * Track all event that SHOULD BE active
 *
 * @type {Set<string>}
 */
const eventToAdd = new Set();

/**
 * Track all event REGISTERED
 *
 * @type {Set<string>}
 */
const eventRegistered = new Set();

/**
 * Store props and return a unique identifier
 *
 * @param {import('./type').DelegateEventObject<Event>} [eventsData]
 * @returns {string} Props id in store.
 */
export const setDelegateBindEvent = (eventsData = {}) => {
    const eventsDataParsed = Object.entries(eventsData);
    const id = MobCore.getUnivoqueId();
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
    if (data) return { target, data };

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

    const { target: targetParsed, data } = getItemFromTarget(target);

    // @ts-ignore
    if (!data || !document.contains(targetParsed)) return;

    const currentEvent = data.find(({ event }) => event === eventKey);
    if (!currentEvent) return;

    /**
     * Get callback.
     */
    const { callback, force } = currentEvent;

    /**
     * Fire one event at time on end of app tick.
     *
     * - Serialize event execution: one per app tick.
     * - Lock is released in finally to prevent deadlock on callback exception.
     * - If route is loading skip action
     * - Force value skip tick check.
     */
    if (!getFireEvent() && !force) return;

    preventFireEvent();

    try {
        await tick();

        /**
         * Seconda verifica: elemento potrebbe essere stato rimosso durante tick (specialmente con :FORCE che bypassa il
         * blocco eventi)
         */
        // @ts-ignore
        if (!document.contains(targetParsed)) return;

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
        Object.defineProperty(event, 'target', { value: target });
        Object.defineProperty(event, 'currentTarget', { value: targetParsed });

        /**
         * Fire callback.
         */
        callback(
            event,
            currentRepeaterState?.current,
            currentRepeaterState?.index
        );
    } catch (error) {
        console.warn(error);
    } finally {
        /**
         * Now other event sill be fired
         */
        allowFireEvent();
    }
}

/**
 * Clean ghost delegate event with no more target.
 *
 * Called at the end of `applyDelegationBindEvent`, after new WeakRefs and listeners have been registered. This ordering
 * guarantees that refs belonging to components just parsed are alive when the filter runs, preventing the unnecessary
 * remove+add cycle of listeners during route changes and reactive updates (repeater/invalidate).
 */
const cleanDelegateEvent = () => {
    for (const [eventKey, refs] of eventTargetRefs) {
        const aliveRef = refs.filter((ref) => ref.deref()?.isConnected);

        if (aliveRef.length === 0) {
            /**
             * Event has no more refs, remove listener.
             */
            const rootElement = getRoot();
            const handlerToRemove = activeHandlers.get(eventKey);

            if (handlerToRemove) {
                if (rootElement?.isConnected)
                    rootElement.removeEventListener(eventKey, handlerToRemove);

                activeHandlers.delete(eventKey);
                eventRegistered.delete(eventKey);
                eventToAdd.delete(eventKey);
            }

            eventTargetRefs.delete(eventKey);
        } else {
            /**
             * Update refs for event with only alive element.
             */
            eventTargetRefs.set(eventKey, aliveRef);
        }
    }
};

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
        const eventArray = tempDelegateEventMap.get(id);
        if (!eventArray) return;

        /**
         * Riorganizziamo gli array
         *
         * - Gli eventi vengono eseguito 1 per tick.
         * - Con `force: true` forziamo l'evento a essere eseguito in un tick giá occupato.
         * - { event: string, force: boolean, callback: function }[]
         */
        const eventsParsed = eventArray.map(([eventName, callback]) => {
            const force = eventName.toUpperCase().endsWith(FORCE_EVENT);
            const eventParsed = eventName
                .toUpperCase()
                .replaceAll(FORCE_EVENT, '')
                .toLowerCase();

            if (!eventToAdd.has(eventParsed)) eventToAdd.add(eventParsed);

            /**
             * Add WeakRef element to eventTargetRefs
             *
             * - EventTargetRefs is used to remove listener when event ha no more subscriber.
             */
            if (eventTargetRefs.has(eventParsed)) {
                eventTargetRefs.get(eventParsed)?.push(new WeakRef(element));
            } else {
                eventTargetRefs.set(eventParsed, [new WeakRef(element)]);
            }

            return { event: eventParsed, callback, force };
        });

        eventDelegationMap.set(element, eventsParsed);
        tempDelegateEventMap.delete(id);
    });

    const rootElement = getRoot();

    for (const eventKey of eventToAdd) {
        if (eventRegistered.has(eventKey)) continue;
        eventRegistered.add(eventKey);

        /**
         * Add one listener to rootElement fory type.
         */
        const boundHandler = handleAction.bind(null, eventKey);
        rootElement.addEventListener(eventKey, boundHandler);
        activeHandlers.set(eventKey, boundHandler);
    }

    /**
     * Clear tail of event to register.
     */
    eventToAdd.clear();

    /**
     * Now that new WeakRefs and listeners are registered, prune ghost refs from components just destroyed. Running
     * clean here (instead of externally after the sync call) avoids the async/sync race where clean saw only dead refs
     * and removed a listener about to be re-added.
     */
    cleanDelegateEvent();
};
