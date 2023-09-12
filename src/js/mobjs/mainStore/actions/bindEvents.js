// @ts-check

import { mobCore } from '../../../mobCore';
import { mainStore } from '../mainStore';

/**
 * @param {Array<String,function>} [ eventsArray ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
 *
 */
export const setBindEvents = (eventsArray = []) => {
    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    mainStore.set('bindEvents', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: eventsArray }];
    });

    return id;
};

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {String} obj.id
 * @return {void}
 *
 * @description
 * Store props and return a unique indentifier
 *
 */
export const applyBindEvents = ({ element, id }) => {
    const { bindEvents } = mainStore.get();

    /**
     * @type {Object|undefined}
     * Get props.
     */
    const eventsArray = bindEvents.find((/** @type {Object} */ item) => {
        return item?.[id];
    });

    eventsArray[id].forEach((/** @type{{string:function }} */ event) => {
        const eventName = Object.keys(event)[0];
        const callback = Object.values(event)[0];

        if (!eventName || !callback) return;

        element.addEventListener(eventName, (e) => callback(e));
    });

    /**
     * Remove props
     */
    mainStore.set('bindEvents', (/** @type {Array} */ prev) => {
        return prev.filter((/** @type {Object} */ item) => {
            return !(id in item);
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
