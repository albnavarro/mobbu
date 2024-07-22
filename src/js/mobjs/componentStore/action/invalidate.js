import { mobCore } from '../../../mobCore';
import { QUEQUE_TYPE_INVALIDATE } from '../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/mainStore';
import { incrementTickQueuque } from '../tick';
import { incrementInvalidateTickQueuque } from '../tickInvalidate';
import { repeaterTick } from '../tickRepeater';
import { destroyComponentInsideNodeById } from './removeAndDestroy';

/**
 * @description
 * Store parent invalidate by a webcomponent utils
 * Key is invalidate id
 * Component track in invalidateId array all the reference to this map.
 *
 * @type {Map<string, HTMLElement>}
 */
export const invalidateIdPlaceHolderMap = new Map();

/**
 * @description
 * Store initialize invalidate function
 * Key is componentId
 *
 * @type {Map<string, Array<{invalidateId:string, fn: () => void }>>}
 */
export const invalidateFunctionMap = new Map();

/**
 * @description
 * Clean the two utils map on component destroy.
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
    invalidateFunctionMap.set(id, valueParsed);
};

/**
 * @description
 * Get all invalidate inside HTMLElement
 *
 * @param {HTMLElement} element
 * @returns {{id: string, parent:HTMLElement}[]}
 */
export const getInvalidateInsideElement = (element) => {
    const entries = [...invalidateIdPlaceHolderMap.entries()];

    return (
        entries
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_id, parent]) => element.contains(parent))
            .map(([id, parent]) => ({
                id,
                parent,
            }))
    );
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
    invalidateFunctionMap.set(id, [...currentFunctions, { invalidateId, fn }]);
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
 * Store parent invalidate block from invalidate webComponent.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {HTMLElement} params.parent = parent of invalidate web-component
 */
export const addInvalidateParent = ({ id = '', parent }) => {
    invalidateIdPlaceHolderMap.set(id, parent);
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

    const parent = invalidateIdPlaceHolderMap.get(id);
    return parent;
};

/**
 * @param {object} params
 * @param {string[]} params.bind
 * @param {import('../../type').Watch<any>} params.watch
 * @param {string} params.id
 * @param {string} params.invalidateId
 * @param {() => string} params.renderFunction
 * @returns {Promise<any>}
 *
 */
export const inizializeInvalidateWatch = async ({
    bind = [],
    watch,
    id,
    invalidateId,
    renderFunction,
}) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    /**
     * Update component
     */
    bind.forEach((state) => {
        watch(state, async () => {
            if (watchIsRunning) return;

            const invalidateParent = getInvalidateParent({
                id: invalidateId,
            });

            /**
             * Invalidate component after repeater
             * Invalidate can be used inside repaater, but should be updated after
             */
            await repeaterTick();

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
                /**
                 * Remove child invalidate of this invalidate.
                 */
                const invalidatechildToDelete =
                    getInvalidateInsideElement(invalidateParent);

                const invalidateChildToDeletePArsed = [
                    ...invalidateFunctionMap.values(),
                ]
                    .flat()
                    .filter((item) => {
                        return invalidatechildToDelete.some((current) => {
                            return current.id === item.invalidateId;
                        });
                    });

                invalidateChildToDeletePArsed.forEach((item) => {
                    removeInvalidateByInvalidateId({
                        id,
                        invalidateId: item.invalidateId,
                    });
                });
                /**
                 * End
                 */

                /**
                 * Remove old component.
                 */
                destroyComponentInsideNodeById({
                    id,
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
                    { element: invalidateParent, parentId: id },
                    false
                );

                await mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);

                watchIsRunning = false;
                descrementQueue();
                decrementInvalidateQueque();

                /**
                 * Run new invalidate init function
                 */
                const newInvalidateChild =
                    getInvalidateInsideElement(invalidateParent);

                const invalidateChildToInizialize = [
                    ...invalidateFunctionMap.values(),
                ]
                    .flat()
                    .filter((item) => {
                        return newInvalidateChild.some((current) => {
                            return current.id === item.invalidateId;
                        });
                    });

                invalidateChildToInizialize.forEach(({ fn }) => {
                    fn();
                });

                console.log(invalidateFunctionMap);
                /**
                 * End
                 */
            });
        });
    });
};
