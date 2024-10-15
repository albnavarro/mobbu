import { mobCore } from '../../../mobCore';
import { QUEQUE_TYPE_INVALIDATE } from '../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/mainStore';
import { incrementTickQueuque } from '../../queque/tick';
import { incrementInvalidateTickQueuque } from '../../queque/tickInvalidate';
import { destroyNestedRepeat, inizializeNestedRepeat } from '../repeater';
import {
    freezePropById,
    unFreezePropById,
} from '../../component/action/freeze';
import { destroyComponentInsideNodeById } from '../../component/action/removeAndDestroy';
import { getFallBackParentByElement } from '../../component/action/parent';
import {
    getRepeatOrInvalidateInsideElement,
    MODULE_INVALIDATE,
} from '../commonRepeatInvalidate';

/**
 * @description
 * Store parent invalidate by a webcomponent utils
 * Key is invalidate id
 * ScopeId is the component id that contains invalidate when is initialized
 * ( for nested invalidate performance check on destroy )
 *
 * @type {Map<string, {element: HTMLElement, initialized: boolean, scopeId: string|undefined }>}
 */
export const invalidateIdPlaceHolderMap = new Map();

/**
 * @returns {number}
 */
export const getNumberOfActiveInvalidate = () =>
    invalidateIdPlaceHolderMap.size;

/**
 * @description
 * Store host of webComponent
 * Key is invalidateId
 *
 * @type {Map<string, HTMLElement>}
 */
export const invalidateIdHostMap = new Map();

/**
 * @description
 * Store initialize invalidate function map.
 * Key is componentId
 *
 * @type {Map<string, Array<{invalidateId:string, fn: () => void, unsubscribe: (() => void)[]  }>>}
 */
export const invalidateFunctionMap = new Map();

/**
 * @description
 * Is the first call to populate placeholderMap.
 * Initialize all the props.
 *
 * Here we have scopeId, content is just render from getParamsForComponent()
 * element: we will wait the end of parse.
 * initialize: we will wait fire function.
 *
 * @param {object} params
 * @param {string} params.invalidateId - invalidateId
 * @param {string} params.scopeId - scopeId
 * @returns {void}
 */
export const setInvalidatePlaceholderMapScopedId = ({
    invalidateId,
    scopeId,
}) => {
    invalidateIdPlaceHolderMap.set(invalidateId, {
        element: undefined,
        initialized: false,
        scopeId,
    });
};

/**
 * @description
 * Set initialized to true.
 * Set scopedId.
 *
 * @param {object} params
 * @param {string} params.invalidateId - invalidateId
 * @returns {void}
 */
export const setInvalidatePlaceholderMapInitialized = ({ invalidateId }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;

    invalidateIdPlaceHolderMap.set(invalidateId, {
        ...item,
        initialized: true,
    });
};

/**
 * @description
 * Store parent invalidate block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.invalidateId - invalidateId id
 * @param {object} params.host  - webComponent root
 */
export const setParentInvalidate = ({ invalidateId, host }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;

    const parent = /** @type{HTMLElement} */ (host.parentNode);
    invalidateIdPlaceHolderMap.set(invalidateId, {
        ...item,
        element: parent,
    });
    invalidateIdHostMap.set(invalidateId, host);
};

/**
 * @description
 * Clean the two utils map on component destroy.
 * Remove by componentId.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @returns {void}
 */
export const removeInvalidateId = ({ id }) => {
    if (invalidateFunctionMap.has(id)) {
        const value = invalidateFunctionMap.get(id);

        /**
         *Remove reference to parent Id taken from invalidate web component.
         */
        value.forEach(({ invalidateId }) => {
            if (invalidateIdPlaceHolderMap.has(invalidateId)) {
                invalidateIdPlaceHolderMap.delete(invalidateId);
            }
        });

        /**
         * Delete all
         */
        invalidateFunctionMap.delete(id);
    }
};

/**
 * @description
 * Remove invalidate by id filtered by invalidateId
 * Remove only current invalidate, each component use many invalidate.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.invalidateId - invalidate id
 * @returns {void}
 */
export const removeInvalidateByInvalidateId = ({ id, invalidateId }) => {
    if (!invalidateFunctionMap.has(id)) return;

    const value = invalidateFunctionMap.get(id);
    const valueParsed = value.filter(
        (item) => item.invalidateId !== invalidateId
    );

    if (invalidateIdPlaceHolderMap.has(invalidateId)) {
        invalidateIdPlaceHolderMap.delete(invalidateId);
    }

    invalidateFunctionMap.set(id, valueParsed);
};

/**
 * @description
 * Add new invalidate sterter function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.invalidateId - invalidate id
 * @param {() => void} params.fn
 * @returns {void}
 */
export const setInvalidateFunction = ({ id, invalidateId, fn }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    invalidateFunctionMap.set(id, [
        ...currentFunctions,
        { invalidateId, fn, unsubscribe: [() => {}] },
    ]);
};

/**
 * @description
 * Add new invalidate unsubscribe function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.invalidateId - invalidate id
 * @param {(() => void)[]} params.unsubscribe
 * @returns {void}
 */
export const addInvalidateUnsubcribe = ({ id, invalidateId, unsubscribe }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item) => {
        if (item.invalidateId === invalidateId) {
            return { ...item, unsubscribe };
        }

        return item;
    });

    invalidateFunctionMap.set(id, item);
};

/**
 * @description
 * Get invalidate starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<{invalidateId: string, fn: () => void }>}
 */
export const getInvalidateFunctions = ({ id }) => {
    return invalidateFunctionMap.get(id) ?? [];
};

/**
 * @description
 * Get invalidate parent by invalidate id.
 *
 * @returns {HTMLElement}
 */
export const getInvalidateParent = ({ id }) => {
    if (!invalidateIdPlaceHolderMap.has(id)) {
        return;
    }

    /**
     * Remove webComponent after first call to invalidateParent
     */
    if (invalidateIdHostMap.has(id)) {
        const host = invalidateIdHostMap.get(id);
        // @ts-ignore
        host?.removeCustomComponent();
        host.remove();
        invalidateIdHostMap.delete(id);
    }

    const parent = invalidateIdPlaceHolderMap.get(id);
    return parent?.element;
};

/**
 * @description
 * Destroy nester invalidate.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.invalidateParent
 * @returns {void}
 */
export const destroyNestedInvalidate = ({ id, invalidateParent }) => {
    const invalidatechildToDelete = getRepeatOrInvalidateInsideElement({
        element: invalidateParent,
        skipInitialized: false,
        onlyInitialized: true,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    const invalidateChildToDeleteParsed = [...invalidateFunctionMap.values()]
        .flat()
        .filter((item) => {
            return invalidatechildToDelete.some((current) => {
                return current.id === item.invalidateId;
            });
        });

    invalidateChildToDeleteParsed.forEach((item) => {
        item.unsubscribe.forEach((fn) => {
            fn();
        });

        removeInvalidateByInvalidateId({
            id,
            invalidateId: item.invalidateId,
        });
    });
};

/**
 * @description
 * Initialize watch function of nested invalidate.
 * Start initialize from older one, so child invalidate is render after parent invalidate
 *
 * @param {object} params
 * @param {HTMLElement} params.invalidateParent
 * @param {string} params.id - componentId
 * @returns {void}
 */
export const inizializeNestedInvalidate = ({ invalidateParent, id }) => {
    const newInvalidateChild = getRepeatOrInvalidateInsideElement({
        element: invalidateParent,
        skipInitialized: true,
        onlyInitialized: false,
        componentId: id,
        module: MODULE_INVALIDATE,
    });

    const invalidateChildToInizialize = [...invalidateFunctionMap.values()]
        .flat()
        .filter(({ invalidateId }) => {
            return newInvalidateChild.some((current) => {
                return current.id === invalidateId;
            });
        });

    invalidateChildToInizialize.forEach(({ fn }) => {
        fn();
    });
};

/**
 * @param {object} params
 * @param {string[]} params.bind
 * @param {() => Promise<any>} params.beforeUpdate
 * @param {() => void} params.afterUpdate
 * @param {import('../../type').Watch<any>} params.watch
 * @param {string} params.id
 * @param {boolean} params.persistent
 * @param {string} params.invalidateId
 * @param {() => string} params.renderFunction
 * @returns {Promise<any>}
 *
 */
export const inizializeInvalidateWatch = async ({
    bind = [],
    beforeUpdate = () => Promise.resolve(),
    afterUpdate = () => {},
    watch,
    id,
    invalidateId,
    persistent = false,
    renderFunction,
}) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    /**
     * When invalidateId is created nested Main component is not parsed.
     * So addSelfIdToParentComponent doesn't work.
     * Get first element that contains invalidateParent start from last map element.
     */
    const fallBackParentId = getFallBackParentByElement({
        element: getInvalidateParent({ id: invalidateId }),
    });

    /**
     * Update component
     */
    const unsubScribeArray = bind.map((state) => {
        const unsubscribe = watch(state, async () => {
            if (watchIsRunning) return;

            freezePropById({ id, prop: state });

            const invalidateParent = getInvalidateParent({
                id: invalidateId,
            });

            /**
             * Track queque.
             */
            const descrementQueue = incrementTickQueuque({
                state,
                id,
                type: QUEQUE_TYPE_INVALIDATE,
            });

            const decrementInvalidateQueque = incrementInvalidateTickQueuque({
                state,
                id,
                type: QUEQUE_TYPE_INVALIDATE,
            });

            /**
             * Update
             */
            watchIsRunning = true;
            mobCore.useNextLoop(async () => {
                if (!invalidateParent) {
                    unFreezePropById({ id, prop: state });
                    return;
                }

                await beforeUpdate();

                /**
                 * Remove child invalidate of this invalidate.
                 */
                destroyNestedInvalidate({ id, invalidateParent });
                destroyNestedRepeat({ id, repeatParent: invalidateParent });

                /**
                 * Remove old component.
                 */
                destroyComponentInsideNodeById({
                    id: fallBackParentId ?? id,
                    container: invalidateParent,
                });

                /**
                 * Create new component.
                 */
                invalidateParent.textContent = '';
                invalidateParent.insertAdjacentHTML(
                    'afterbegin',
                    renderFunction()
                );

                /**
                 * Parse new component.
                 */
                mainStore.set(
                    MAIN_STORE_ASYNC_PARSER,
                    {
                        element: invalidateParent,
                        parentId: fallBackParentId ?? id,
                        persistent,
                    },
                    false
                );

                await mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);

                watchIsRunning = false;
                descrementQueue();
                decrementInvalidateQueque();

                /**
                 * Run new invalidate init function
                 */
                inizializeNestedInvalidate({ invalidateParent, id });
                inizializeNestedRepeat({ repeatParent: invalidateParent, id });

                unFreezePropById({ id, prop: state });

                afterUpdate();
            });
        });

        return unsubscribe;
    });

    addInvalidateUnsubcribe({
        id,
        invalidateId,
        unsubscribe: unsubScribeArray,
    });
};
