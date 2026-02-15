import { getRepeaterComponentChildren } from '../../modules/repeater/action/set-repeat-component-children';
import { componentMap } from '../component-map';
import {
    addElementToWeakElementMap,
    getIdFromWeakElementMap,
} from '../weak-element-map';

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {HTMLElement | import('../../web-component/type').UserComponent} obj.newElement
 * @returns {void}
 */
export const setElementById = ({
    id = '',
    newElement = document.createElement('div'),
}) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    /**
     * Add element to main Map
     */
    componentMap.set(id, { ...item, element: newElement });

    /**
     * Add element to weakMap
     */
    addElementToWeakElementMap({ element: newElement, id });
};

/**
 * Get element by id
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {HTMLElement | undefined}
 */
export const getElementById = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    return item?.element;
};

/**
 * Get element by id
 *
 * @param {object} obj
 * @param {HTMLElement | undefined} obj.element
 * @returns {string | undefined}
 */
export const getIdByElement = ({ element }) => {
    if (!element) return '';

    return getIdFromWeakElementMap({ element });
};

/**
 * Get component ( element && id ) from repeatInstancesMap filtered by key equality
 *
 * @param {object} obj
 * @param {string} obj.keyValue
 * @param {string} obj.repeatId
 * @returns {{ id: string; element: HTMLElement }[]}
 */
export const getElementsByKeyAndRepeatId = ({
    keyValue = '',
    repeatId = '',
}) => {
    if (keyValue?.length === 0) return [];

    const repeaterChildrenId = getRepeaterComponentChildren({ repeatId });

    /**
     * Logica del pettern
     *
     * - All' interno di un flatMap tornare un array vuoto ( [] ) permette di:
     * - Filtrare in uscita tramite gli array vuoti ( flat ).
     * - In questo modo l'array finale puó avere una lunghezza diversa rispetto all'array iniziale.
     * - E' simile ad un reduce ma da un array torna un array.
     */
    return repeaterChildrenId.flatMap((id) => {
        const component = componentMap.get(id);
        if (!component) return [];

        const { element, key } = component;
        return `${key}` === `${keyValue}` ? [{ element, id }] : [];
    });
};
