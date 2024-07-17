import { mobCore } from '../../../mobCore';
import { QUEQUE_TYPE_INVALIDATE } from '../../constant';
import { MAIN_STORE_REPEATER_PARSER_ROOT } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/mainStore';
import { incrementTickQueuque } from '../tick';
import { repeaterTick } from '../tickRepeater';
import { awaitNextLoop } from '../utils';
import { destroyComponentInsideNodeById } from './removeAndDestroy';

/**
 * @description
 * Store parent invalidate by a webcomponent utils
 *
 * @type {Map<string, HTMLElement>}
 */
const invalidatePlaceHolderMap = new Map();

/**
 * @description
 * Store parent invalidate block from invalidate webComponent.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {HTMLElement} params.parent
 */
export const addIvalidateParent = ({ id = '', parent }) => {
    invalidatePlaceHolderMap.set(id, parent);
};

/**
 * @returns {HTMLElement}
 */
export const getFirstInvalidateParent = ({ id }) => {
    if (!invalidatePlaceHolderMap.has(id)) {
        return;
    }

    return invalidatePlaceHolderMap.get(id);
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
     * Bind watch after current loop has resolved.
     * Skip double rendering on initialization
     */
    await awaitNextLoop();

    /**
     * Update component
     */
    bind.forEach((state) => {
        watch(state, async () => {
            if (watchIsRunning) return;

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

            /**
             * Update
             */
            watchIsRunning = true;
            mobCore.useNextLoop(async () => {
                const invalidateParent = getFirstInvalidateParent({
                    id: invalidateId,
                });

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
                    MAIN_STORE_REPEATER_PARSER_ROOT,
                    { element: invalidateParent, parentId: id },
                    false
                );

                await mainStore.emitAsync(MAIN_STORE_REPEATER_PARSER_ROOT);

                watchIsRunning = false;
                descrementQueue();
            });
        });
    });
};
