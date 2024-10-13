import { watchRepeat } from './watch';

/**
 * @description
 * Store parent repeat by a webcomponent utils
 * Key is repeat id
 * Component track in repeatId array all the reference to this map.
 *
 * @type {Map<string, {element: HTMLElement, initialized: boolean }>}
 */
export const repeatIdPlaceHolderMap = new Map();

/**
 * @returns {number}
 */
export const getNumberOfActiveRepeater = () => {
    return repeatIdPlaceHolderMap.size;
};

/**
 * @description
 * Store how web component
 * Key is repeat id
 *
 * @type {Map<string, HTMLElement>}
 */
export const repeatIdHostMap = new Map();

/**
 * @description
 * Store initialize repeat function
 * Key is componentId
 *
 * @type {Map<string, Array<{repeatId:string, fn: () => void, unsubscribe: () => void  }>>}
 */
export const repeatFunctionMap = new Map();

/**
 * @param {object} params
 * @param {string} params.repeatId - repeatId
 * @returns {void}
 */
export const setRepeaterPlaceholderMapInitialized = ({ repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    repeatIdPlaceHolderMap.set(repeatId, { ...item, initialized: true });
};

/**
 * @description
 * Clean the two utils map on component destroy.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @returns {void}
 */
export const removeRepeaterId = ({ id }) => {
    if (repeatFunctionMap.has(id)) {
        const value = repeatFunctionMap.get(id);

        /**
         *Remove reference to parent Id taken from repeat web component.
         */
        value.forEach(({ repeatId }) => {
            if (repeatIdPlaceHolderMap.has(repeatId)) {
                repeatIdPlaceHolderMap.delete(repeatId);
            }
        });

        /**
         * Delete all
         */
        repeatFunctionMap.delete(id);
    }
};

/**
 * @description
 * Remove repeat by id filtered by repeatId
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.repeatId - repeat id
 * @returns {void}
 */
export const removeRepeatByRepeatId = ({ id, repeatId }) => {
    if (!repeatFunctionMap.has(id)) return;

    const value = repeatFunctionMap.get(id);
    const valueParsed = value.filter((item) => item.repeatId !== repeatId);

    if (repeatIdPlaceHolderMap.has(repeatId)) {
        repeatIdPlaceHolderMap.delete(repeatId);
    }

    repeatFunctionMap.set(id, valueParsed);
};

/**
 * @description
 * Get all repeat inside HTMLElement
 *
 * @param {object} params
 * @param {HTMLElement} params.element
 * @param {boolean} [ params.skipInitialized ]
 * @returns {{id: string, parent:HTMLElement}[]}
 */
export const getRepeatInsideElement = ({
    element,
    skipInitialized = false,
}) => {
    const entries = [...repeatIdPlaceHolderMap.entries()];

    return entries
        .filter(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_id, parent]) => {
                if (skipInitialized && parent?.initialized) {
                    return false;
                }

                return (
                    element?.contains(parent.element) &&
                    element !== parent.element
                );
            }
        )
        .map(([id, parent]) => ({
            id,
            parent: parent?.element,
        }));
};

/**
 * @description
 * Add new repeat sterter function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.repeatId - repeat id
 * @param {() => void} params.fn
 * @returns {void}
 */
export const setRepeatFunction = ({ id, repeatId, fn }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    repeatFunctionMap.set(id, [
        ...currentFunctions,
        { repeatId, fn, unsubscribe: () => {} },
    ]);
};

/**
 * @description
 * Add new repeat sterter function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.repeatId - repeat id
 * @param {() => void} params.unsubscribe
 * @returns {void}
 */
export const addRepeatUnsubcribe = ({ id, repeatId, unsubscribe }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item) => {
        if (item.repeatId === repeatId) {
            return { ...item, unsubscribe };
        }

        return item;
    });

    repeatFunctionMap.set(id, item);
};

/**
 * @description
 * Get repeat starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<{repeatId: string, fn: () => void }>}
 */
export const getRepeatFunctions = ({ id }) => {
    return repeatFunctionMap.get(id) ?? [];
};

/**
 * @description
 * Store parent repeat block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.repeatId - repeat id
 * @param {object} params.host  - webComponent root
 */
export const setParentRepeater = ({ repeatId, host }) => {
    const parent = /** @type{HTMLElement} */ (host.parentNode);
    repeatIdPlaceHolderMap.set(repeatId, {
        element: parent,
        initialized: false,
    });

    repeatIdHostMap.set(repeatId, host);
};

/**
 * @description
 * Get repeat parent by repeat id.
 *
 * @returns {HTMLElement}
 */
export const getRepeatParent = ({ id }) => {
    if (!repeatIdPlaceHolderMap.has(id)) {
        return;
    }

    /**
     * Remove webComponent after first call to repeaterParent
     */
    if (repeatIdHostMap.has(id)) {
        const host = repeatIdHostMap.get(id);
        // @ts-ignore
        host?.removeCustomComponent();
        host.remove();
        repeatIdHostMap.delete(id);
    }

    const parent = repeatIdPlaceHolderMap.get(id);
    return parent?.element;
};

/**
 * @description
 * Destroy nester repeat.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.repeatParent
 * @returns {void}
 */
export const destroyNestedRepeat = ({ id, repeatParent }) => {
    const repeatChildToDelete = getRepeatInsideElement({
        element: repeatParent,
        skipInitialized: false,
    });

    const repeatChildToDeleteParsed = [...repeatFunctionMap.values()]
        .flat()
        .filter((item) => {
            return repeatChildToDelete.some((current) => {
                return current.id === item.repeatId;
            });
        });

    repeatChildToDeleteParsed.forEach((item) => {
        item.unsubscribe();
        removeRepeatByRepeatId({
            id,
            repeatId: item.repeatId,
        });
    });
};

/**
 * @description
 * Initialize watch function of nested repeat.
 * Start initialize from older one, so child repeat is render after parent repeat
 *
 * @param {object} params
 * @param {HTMLElement} params.repeatParent
 * @returns {void}
 */
export const inizializeNestedRepeat = ({ repeatParent }) => {
    const newRepeatChild = getRepeatInsideElement({
        element: repeatParent,
        skipInitialized: true,
    });

    const repeatChildToInizialize = [...repeatFunctionMap.values()]
        .flat()
        .filter(({ repeatId }) => {
            return newRepeatChild.some((current) => {
                setRepeaterPlaceholderMapInitialized({
                    repeatId,
                });

                return current.id === repeatId;
            });
        });

    repeatChildToInizialize.forEach(({ fn }) => {
        fn();
    });
};

/**
 * @param {import('./type').watchListType} param
 * @return {void}
 */
export const inizializeRepeatWatch = ({
    repeatId,
    persistent,
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
    const unsubscribe = watchRepeat({
        state,
        setState,
        persistent,
        emit,
        watch,
        clean,
        beforeUpdate,
        afterUpdate,
        key,
        id,
        repeatId,
        render,
    });

    addRepeatUnsubcribe({
        id,
        repeatId,
        unsubscribe,
    });
};
