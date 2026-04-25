import { componentMap } from '../component-map';

/**
 * Add bindEvnet handler to component map.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {{ eventName: string; handler: (arg0: Event) => void }[]} params.handlers
 * @returns {void}
 */
export const setBindEventsById = ({ id = '', handlers = [] }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    /**
     * Add element to main Map
     */
    componentMap.set(id, { ...item, bindEventsHandlers: handlers });
};
