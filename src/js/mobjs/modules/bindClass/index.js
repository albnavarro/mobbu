import { mobCore } from '../../../mobCore';
import { ATTR_BIND_CLASS } from '../../constant';

/** @type{import("./type").BindClassMap} */
const bindClassMap = new Map();

/**
 * @description Save bindClass data in temporary map
 *
 * @type {import("./type").BindClassSet}
 */
export const setBindClass = ({ data, id }) => {
    /** @type{import('./type').BindClassObject<any>[]} */
    const dataToArray = mobCore.checkType(Array, data) ? data : [data];

    const dataBindToArray = dataToArray.map(({ bind, toggle }) => {
        return {
            bind: /** @type{string[]} */ (
                mobCore.checkType(Array, bind) ? bind : [bind]
            ),
            toggle,
        };
    });

    const item = {
        parentId: id,
        items: dataBindToArray,
    };

    const univoqueId = mobCore.getUnivoqueId();
    bindClassMap.set(univoqueId, item);
    return univoqueId;
};

/**
 * @description Get data from map at the end of parse.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const applyBindClass = (element) => {
    const occurrences = /** @type{HTMLElement[]} */ ([
        ...element.querySelectorAll(`[${ATTR_BIND_CLASS}]`),
    ]);

    /**
     * TODO:
     * Check that target don't is garbage collected.
     */
    occurrences.forEach((target) => {
        const id = target.getAttribute(ATTR_BIND_CLASS);
        if (!id) return;

        const data = bindClassMap.get(id);
        if (!data) return;

        target.removeAttribute(ATTR_BIND_CLASS);
        watchBindClass({ data, element: target });
        bindClassMap.delete(id);
    });

    /**
     * Trigger target remove grom garbage collector as soon as possible.
     */
    occurrences.length = 0;
};

/**
 * @description Apply watcher.
 *
 * @param {object} params
 * @param {import('./type').BindClassMapValue} params.data
 * @param {HTMLElement} params.element
 * @returns {void}
 */
const watchBindClass = ({ data, element }) => {
    console.log(data, element);
};
