// @ts-check

import { mobCore } from '../../../../mobCore';
import {
    freezePropById,
    unFreezePropById,
} from '../../../component/action/freeze';
import { getFallBackParentByElement } from '../../../component/action/parent';
import { destroyComponentInsideNodeById } from '../../../component/action/removeAndDestroy/destroyComponentInsideNodeById';
import { QUEQUE_TYPE_INVALIDATE } from '../../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../../mainStore/constant';
import { mainStore } from '../../../mainStore/mainStore';
import { incrementTickQueuque } from '../../../queque/tick';
import { incrementInvalidateTickQueuque } from '../../../queque/tickInvalidate';
import { destroyNestedRepeat } from '../../repeater/action/destroyNestedRepeat';
import { inizializeNestedRepeat } from '../../repeater/watch/inizializeNestedRepeat';
import { addInvalidateUnsubcribe } from './addInvalidateUnsubcribe';
import { destroyNestedInvalidate } from './destroyNestedInvalidate';
import { getInvalidateParent } from './getInvalidateParent';
import { inizializeNestedInvalidate } from './inizializeNestedInvalidate';

/**
 * @param {object} params
 * @param {string[]} params.bind
 * @param {() => Promise<any>} params.beforeUpdate
 * @param {() => void} params.afterUpdate
 * @param {import('../../../type').Watch<any>} params.watch
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