import { mobCore } from '../../../mobCore';
import { QUEQUE_TYPE_INVALIDATE } from '../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/mainStore';
import { incrementTickQueuque } from '../../queque/tick';
import { incrementInvalidateTickQueuque } from '../../queque/tickInvalidate';
import { destroyNestedRepeat } from '../repeater/action/destroyNestedRepeat';
import {
    freezePropById,
    unFreezePropById,
} from '../../component/action/freeze';
import { destroyComponentInsideNodeById } from '../../component/action/removeAndDestroy/removeAndDestroy';
import { getFallBackParentByElement } from '../../component/action/parent';
import { inizializeNestedRepeat } from '../repeater/watch/inizializeNestedRepeat';
import { invalidateIdPlaceHolderMap } from './invalidateIdPlaceHolderMap.js';
import { invalidateFunctionMap } from './invalidateFunctionMap';
import { destroyNestedInvalidate } from './action/destroyNestedInvalidate';
import { inizializeNestedInvalidate } from './action/inizializeNestedInvalidate';
import { getInvalidateParent } from './action/getInvalidateParent';

/**
 * @returns {number}
 */
export const getNumberOfActiveInvalidate = () =>
    invalidateIdPlaceHolderMap.size;

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
