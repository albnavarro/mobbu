import { watchEach } from '../../each/eachList';

/**
 * @description
 * Store parent each by a webcomponent utils
 * Key is each id
 * Component track in eachId array all the reference to this map.
 *
 * @type {Map<string, HTMLElement>}
 */
export const eachIdPlaceHolderMap = new Map();

/**
 * @description
 * Store initialize each function
 * Key is componentId
 *
 * @type {Map<string, Array<{eachId:string, fn: () => void, unsubscribe: (() => void)[]  }>>}
 */
export const eachFunctionMap = new Map();

/**
 * @description
 * Clean the two utils map on component destroy.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @returns {void}
 */
export const removeEachId = ({ id }) => {
    if (eachFunctionMap.has(id)) {
        const value = eachFunctionMap.get(id);

        /**
         *Remove reference to parent Id taken from each web component.
         */
        value.forEach(({ eachId }) => {
            if (eachIdPlaceHolderMap.has(eachId)) {
                eachIdPlaceHolderMap.delete(eachId);
            }
        });

        /**
         * Delete all
         */
        eachFunctionMap.delete(id);
    }
};

/**
 * @description
 * Remove each by id filtered by eachId
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.eachId - each id
 * @returns {void}
 */
export const removeEachByEachId = ({ id, eachId }) => {
    if (!eachFunctionMap.has(id)) return;

    const value = eachFunctionMap.get(id);
    const valueParsed = value.filter((item) => item.eachId !== eachId);

    if (eachIdPlaceHolderMap.has(eachId)) {
        eachIdPlaceHolderMap.delete(eachId);
    }

    eachFunctionMap.set(id, valueParsed);
};

/**
 * @description
 * Get all each inside HTMLElement
 *
 * @param {HTMLElement} element
 * @returns {{id: string, parent:HTMLElement}[]}
 */
export const getEachInsideElement = (element) => {
    const entries = [...eachIdPlaceHolderMap.entries()];

    return entries
        .filter(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_id, parent]) => element?.contains(parent) && element !== parent
        )
        .map(([id, parent]) => ({
            id,
            parent,
        }));
};

/**
 * @description
 * Add new each sterter function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.eachId - each id
 * @param {() => void} params.fn
 * @returns {void}
 */
export const setEachFunction = ({ id, eachId, fn }) => {
    const currentFunctions = eachFunctionMap.get(id) ?? [];
    eachFunctionMap.set(id, [
        ...currentFunctions,
        { eachId, fn, unsubscribe: [() => {}] },
    ]);
};

/**
 * @description
 * Add new each sterter function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.eachId - each id
 * @param {(() => void)[]} params.unsubscribe
 * @returns {void}
 */
export const addEachUnsubcribe = ({ id, eachId, unsubscribe }) => {
    const currentFunctions = eachFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item) => {
        if (item.eachId === eachId) {
            return { ...item, unsubscribe };
        }

        return item;
    });

    eachFunctionMap.set(id, item);
};

/**
 * @description
 * Get each starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<{eachId: string, fn: () => void }>}
 */
export const getEachFunctions = ({ id }) => {
    return eachFunctionMap.get(id) ?? [];
};

/**
 * @description
 * Store parent each block from each webComponent.
 *
 * @param {object} params
 * @param {string} params.id - each id
 * @param {HTMLElement} params.parent = parent of each web-component
 */
export const addEachParent = ({ id = '', parent }) => {
    eachIdPlaceHolderMap.set(id, parent);
};

/**
 * @description
 * Get each parent by each id.
 *
 * @returns {HTMLElement}
 */
export const getEachParent = ({ id }) => {
    if (!eachIdPlaceHolderMap.has(id)) {
        return;
    }

    const parent = eachIdPlaceHolderMap.get(id);
    return parent;
};

/**
 * @description
 * Destroy nester each.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.eachParent
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const destroyNesterEach = ({ id, eachParent }) => {
    const eachChildToDelete = getEachInsideElement(eachParent);

    const eachChildToDeleteParsed = [...eachFunctionMap.values()]
        .flat()
        .filter((item) => {
            return eachChildToDelete.some((current) => {
                return current.id === item.eachId;
            });
        });

    eachChildToDeleteParsed.forEach((item) => {
        item.unsubscribe.forEach((fn) => {
            fn();
        });

        removeEachByEachId({
            id,
            eachId: item.eachId,
        });
    });
};

/**
 * @description
 * Initialize watch function of nested each.
 *
 * @param {object} params
 * @param {HTMLElement} params.eachParent
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inizializeNestedEach = ({ eachParent }) => {
    const newEachChild = getEachInsideElement(eachParent);

    const eachChildToInizialize = [...eachFunctionMap.values()]
        .flat()
        .filter((item) => {
            return newEachChild.some((current) => {
                return current.id === item.eachId;
            });
        });

    eachChildToInizialize.forEach(({ fn }) => {
        fn();
    });
};

/**
 * @param {object} params
 *
 */
export const inizializeEachWatch = async ({
    eachId,
    state,
    setState,
    emit,
    watch,
    clean,
    beforeUpdate,
    afterUpdate,
    key,
    id,
    render,
}) => {
    /**
     * Update component
     */
    const unsubscribe = watchEach({
        state,
        setState,
        emit,
        watch,
        clean,
        beforeUpdate,
        afterUpdate,
        key,
        id,
        eachId,
        render,
    });

    addEachUnsubcribe({
        id,
        eachId,
        unsubscribe: [unsubscribe],
    });

    /**
     * First rendering
     */
    emit(state);
};
