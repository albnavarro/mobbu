import { mobCore } from '../../../mobCore';
import { ATTR_BIND_EFFECT } from '../../constant';

/** @type{import("./type").BindEffectMap} */
const bindEffectMap = new Map();

/**
 * @description Save bindClass data in temporary map
 *
 * @type {import("./type").BindEffectSet}
 */
export const setBindEffect = ({ data, id }) => {
    /** @type{import('./type').BindEffectObject<any>[]} */
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
    bindEffectMap.set(univoqueId, item);
    return univoqueId;
};

/**
 * @description Get data from map at the end of parse.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const applyBindEffect = (element) => {
    const occurrences = /** @type{HTMLElement[]} */ ([
        ...element.querySelectorAll(`[${ATTR_BIND_EFFECT}]`),
    ]);

    /**
     * TODO:
     * Check that target don't is garbage collected.
     */
    occurrences.forEach((target) => {
        const id = target.getAttribute(ATTR_BIND_EFFECT);
        if (!id) return;

        const data = bindEffectMap.get(id);
        if (!data) return;

        target.removeAttribute(ATTR_BIND_EFFECT);
        watchBindEffect({ data, element: target });
        bindEffectMap.delete(id);
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
 * @param {import('./type').BindEffectMapValue} params.data
 * @param {HTMLElement} params.element
 * @returns {void}
 */
const watchBindEffect = ({ data, element }) => {
    console.log(data, element);
};
