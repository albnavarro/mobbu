import { mobCore } from '../../../mobCore';
import { QUEQUE_TYPE_INVALIDATE } from '../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/mainStore';
import { componentMap } from '../store';
import { incrementTickQueuque } from '../tick';
import { incrementInvalidateTickQueuque } from '../tickInvalidate';
import { repeaterTick } from '../tickRepeater';
import { destroyComponentInsideNodeById } from './removeAndDestroy';

/**
 * @description
 * Store parent invalidate by a webcomponent utils
 * Key is invalidate id
 *
 * @type {Map<string, HTMLElement>}
 */
export const invalidateIdPlaceHolderMap = new Map();

/**
 * @description
 * Store initialize invalidate function
 *
 * @type {Map<string, Array<() => void>>}
 */
export const invalidateFunctionMap = new Map();

/**
 * @description
 * Store on componentMap all invalidateId used by component.
 * On component destroy use these is to clean invalidateIdPlaceHolderMap
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.invalidateId = invalidate id
 * @returns {void}
 */
export const setInvalidateId = ({ id, invalidateId }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    const { invalidateId: currentInvalidateId } = item;

    componentMap.set(id, {
        ...item,
        invalidateId: [...currentInvalidateId, invalidateId],
    });
};

/**
 * @description
 * Clean the two utils map on component destroy.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string[]} params.invalidateId = invalidate id stored in array by component
 * @returns {void}
 */
export const removeInvalidateId = ({ id, invalidateId }) => {
    if (invalidateFunctionMap.has(id)) {
        invalidateFunctionMap.delete(id);
    }

    invalidateId.forEach((currentInvalidateId) => {
        if (invalidateIdPlaceHolderMap.has(currentInvalidateId)) {
            invalidateIdPlaceHolderMap.delete(currentInvalidateId);
        }
    });
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {() => void} params.fn
 * @returns {void}
 */
export const setInvalidateFunction = ({ id, fn }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    invalidateFunctionMap.set(id, [...currentFunctions, fn]);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<() => void>}
 */
export const getInvalidateFunctions = ({ id }) => {
    return invalidateFunctionMap.get(id) ?? [];
};

/**
 * @description
 * Store parent invalidate block from invalidate webComponent.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.parent
 */
export const addInvalidateParent = ({ id = '', parent }) => {
    invalidateIdPlaceHolderMap.set(id, parent);
};

/**
 * @returns {HTMLElement}
 */
export const getFirstInvalidateParent = ({ id }) => {
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

            const invalidateParent = getFirstInvalidateParent({
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
            });
        });
    });
};
