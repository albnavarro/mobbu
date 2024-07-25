// @ts-check

import { mobCore } from '../../mobCore';
import { getChildrenIdByName } from '../componentStore/action/children';
import {
    inizializeEachWatch,
    setEachFunction,
} from '../componentStore/action/each';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import {
    inizializeInvalidateWatch,
    setInvalidateFunction,
} from '../componentStore/action/invalidate';
import { getParentIdById } from '../componentStore/action/parent';
import { setDynamicPropsWatch, unBind } from '../componentStore/action/props';
import {
    destroyComponentInsideNodeById,
    removeAndDestroyById,
} from '../componentStore/action/removeAndDestroy';
import { watchById } from '../componentStore/action/watch';
import {
    ATTR_BIND_EVENTS,
    ATTR_DYNAMIC,
    ATTR_INVALIDATE,
    ATTR_MOBJS_EACH,
    ATTR_PROPS,
    ATTR_REPEATID,
    ATTR_WEAK_BIND_EVENTS,
} from '../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';
import { setBindEvents } from '../temporaryData/bindEvents';
import { setBindProps } from '../temporaryData/dynamicProps';
import { addOnMoutCallback } from '../temporaryData/onMount';
import { addRepeat } from '../temporaryData/repeater/add';
import { setStaticProps } from '../temporaryData/staticProps';
import { setDelegateBindEvent } from '../temporaryData/weakBindEvents';
import { renderHtml } from './utils';

/**
 * @param {import('./type').getParamsForComponent} obj.state
 * @returns {import('../type').componentPropsType}
 *
 * @description
 * Create component
 * Reuturn all prosps/method for user function.
 */
export const getParamsForComponentFunction = ({
    getState,
    setState,
    emit,
    emitAsync,
    computed,
    watch,
    id,
    key,
    bindEventsId,
}) => {
    /**
     * Initialize repeatId collector.
     */
    const repeatIdArray = [];

    return {
        bindEventsId,
        key,
        id,
        getState,
        setState,
        emit,
        emitAsync,
        computed,
        watch,
        repeatIdArray,
        renderComponent: async ({
            attachTo,
            component,
            position = 'afterbegin',
            clean = true,
        }) => {
            /**
             * Remove all children inside attachTo.
             * If needed.
             */
            if (clean) {
                destroyComponentInsideNodeById({ id, container: attachTo });
                attachTo.textContent = '';
            }

            /**
             * Attach new component
             */
            attachTo.insertAdjacentHTML(position, component);

            /**
             * Render
             */
            mainStore.set(
                MAIN_STORE_ASYNC_PARSER,
                { element: attachTo, parentId: id },
                false
            );
            return mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);
        },
        invalidate: ({ bind, render }) => {
            const invalidateId = mobCore.getUnivoqueId();
            const sync = `${ATTR_INVALIDATE}=${invalidateId}`;
            const invalidateRender = () => render({ html: renderHtml });

            setInvalidateFunction({
                id,
                invalidateId,
                fn: () => {
                    /**
                     * Fire invalidate id after component parse
                     */
                    inizializeInvalidateWatch({
                        bind,
                        watch,
                        id,
                        invalidateId,
                        renderFunction: invalidateRender,
                    });
                },
            });

            return `<mobjs-invalidate ${sync} style="display:none;"></mobjs-invalidate>${invalidateRender()}`;
        },
        getChildren: (/** @type{string} */ componentName) => {
            return getChildrenIdByName({ id, componentName });
        },
        watchSync: (state, callback) => {
            const unsubscribe = watch(state, callback);
            emit(state);
            return unsubscribe;
        },
        freezeProp: (/** @type{string} */ prop) => freezePropById({ id, prop }),
        unFreezeProp: (/** @type{string} */ prop) =>
            unFreezePropById({ id, prop }),
        unBind: () => unBind({ id }),
        bindProps: (obj) => {
            return `${ATTR_DYNAMIC}="${setBindProps({
                ...obj,
                parentId: obj?.forceParent ? undefined : id,
            })}" `;
        },
        staticProps: (obj) => ` ${ATTR_PROPS}="${setStaticProps(obj)}" `,
        remove: () => {
            removeAndDestroyById({ id });
        },
        removeDOM: (element) => {
            destroyComponentInsideNodeById({ id, container: element });
            element.textContent = '';
        },
        getParentId: () => getParentIdById(id),
        watchParent: (prop, cb) => {
            const unsubscribeParent = watchById(getParentIdById(id), prop, cb);
            setDynamicPropsWatch({ id, unWatchArray: [unsubscribeParent] });
        },
        html: (strings, ...values) => {
            return renderHtml(strings, ...values);
        },

        onMount: (cb) => addOnMoutCallback({ id, cb }),
        bindEvents: (eventsData) => {
            return `${ATTR_BIND_EVENTS}="${setBindEvents(eventsData)}"`;
        },
        delegateEvents: (eventsData) => {
            return `${ATTR_WEAK_BIND_EVENTS}="${setDelegateBindEvent(
                eventsData
            )}"`;
        },
        repeat: ({
            watch: stateToWatch, // use alias to maintain ured naming convention.
            clean = false,
            beforeUpdate = () => {},
            afterUpdate = () => {},
            key,
            render,
        }) => {
            const currentRepeatId = mobCore.getUnivoqueId();
            repeatIdArray.push(currentRepeatId);

            addRepeat({
                repeatId: currentRepeatId,
                obj: {
                    state: stateToWatch,
                    setState,
                    emit,
                    watch,
                    clean,
                    beforeUpdate,
                    afterUpdate,
                    getChildren: (/** @type{string} */ componentName) => {
                        return getChildrenIdByName({ id, componentName });
                    },
                    key,
                    id,
                    render,
                },
            });

            return `<mobjs-repeater ${ATTR_REPEATID}="${currentRepeatId}" style="display:none;"></mobjs-repeater>`;
        },
        mobJsEach: ({
            watch: stateToWatch, // use alias to maintain ured naming convention.
            clean = false,
            beforeUpdate = () => {},
            afterUpdate = () => {},
            key,
            render,
        }) => {
            const eachId = mobCore.getUnivoqueId();

            setEachFunction({
                id,
                eachId,
                fn: () => {
                    /**
                     * Fire invalidate id after component parse
                     */
                    inizializeEachWatch({
                        eachId,
                        state: stateToWatch,
                        setState,
                        emit,
                        watch,
                        clean,
                        beforeUpdate,
                        afterUpdate,
                        getChildren: (/** @type{string} */ componentName) => {
                            return getChildrenIdByName({ id, componentName });
                        },
                        key,
                        id,
                        render,
                    });
                },
            });

            return `<mobjs-each ${ATTR_MOBJS_EACH}="${eachId}" style="display:none;"></mobjs-each>`;
        },
    };
};
