// @ts-check

import { mobCore } from '../../../mobCore';
import { checkType } from '../../../mobCore/store/storeType';
import { getCurrentListValueById } from '../../componentStore/action/currentListValue';
import { mainStore } from '../mainStore';

/**
 * @param {Array<String,function>|Object<String,function>} [ eventsData ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
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
    mainStore.set('bindEvents', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: eventsDataParsed }];
    });

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
 * Store props and return a unique indentifier
 *
 */
export const applyBindEvents = ({ element, componentId, bindEventsId }) => {
    const { bindEvents } = mainStore.get();

    /**
     * @type {Object|undefined}
     * Get props.
     */
    const eventsArray = bindEvents.find((/** @type {Object} */ item) => {
        return item?.[bindEventsId];
    });

    eventsArray[bindEventsId].forEach(
        (/** @type{{string:function }} */ event) => {
            const eventName = Object.keys(event)[0];
            const callback = Object.values(event)[0];

            if (!eventName || !callback) return;

            element.addEventListener(eventName, (e) => {
                /**
                 * Add current repeate rid for dynamic lsit.
                 */
                const currentRepeaterState = getCurrentListValueById({
                    id: componentId,
                });

                callback(e, currentRepeaterState);
            });
        }
    );

    /**
     * Remove props
     */
    mainStore.set('bindEvents', (/** @type {Array} */ prev) => {
        return prev.filter((/** @type {Object} */ item) => {
            return !(bindEventsId in item);
        });
    });
};

/**
 * @return void
 *
 * @description
 * Delete all refs of events.
 * If slot in unsed and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansBindEvent = () => {
    mainStore.set('bindEvents', []);
};
