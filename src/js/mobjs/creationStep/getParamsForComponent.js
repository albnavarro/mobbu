// @ts-check

import { mobCore } from '../../mobCore';
import { getChildrenIdByName } from '../componentStore/action/children';
import {
    inizializeRepeatWatch,
    setRepeatFunction,
} from '../componentStore/action/repeat';
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
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_INVALIDATE,
    ATTR_KEY,
    ATTR_MOBJS_REPEAT,
    ATTR_PROPS,
    ATTR_REPEATER_PROP_BIND,
    ATTR_WEAK_BIND_EVENTS,
} from '../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';
import { setBindEvents } from '../temporaryData/bindEvents';
import { setBindProps } from '../temporaryData/dynamicProps';
import { addOnMoutCallback } from '../temporaryData/onMount';
import { setStaticProps } from '../temporaryData/staticProps';
import { setDelegateBindEvent } from '../temporaryData/weakBindEvents';
import { renderHtml } from './utils';
import { setComponentRepeaterState } from '../temporaryData/currentRepeaterItemValue';
import { getUnivoqueByKey } from '../repeat/utils';

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
        invalidate: ({
            bind,
            render,
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
        }) => {
            const invalidateId = mobCore.getUnivoqueId();
            const sync = `${ATTR_INVALIDATE}=${invalidateId}`;
            const invalidateRender = () => render({ html: renderHtml });

            /**
             * When invalidate is inizilized runtime, all neseted invalidate is initialized.
             * Fire each repeater once.
             */
            let isInizialized = false;

            setInvalidateFunction({
                id,
                invalidateId,
                fn: () => {
                    if (isInizialized) return;

                    /**
                     * Fire invalidate id after component parse
                     */
                    inizializeInvalidateWatch({
                        bind,
                        watch,
                        beforeUpdate,
                        afterUpdate,
                        id,
                        invalidateId,
                        renderFunction: invalidateRender,
                    });

                    isInizialized = true;
                },
            });

            return `<mobjs-invalidate ${sync} style="display:none;"></mobjs-invalidate>${invalidateRender()}`;
        },
        repeat: ({
            watch: stateToWatch, // use alias to maintain ured naming convention.
            clean = false,
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
            key,
            render,
        }) => {
            const repeatId = mobCore.getUnivoqueId();
            const hasKey = key && key !== '';
            const initialState = getState()?.[stateToWatch];
            const currentUnique = hasKey
                ? getUnivoqueByKey({ data: initialState, key })
                : initialState;

            /**
             * Render immediately first DOM
             */
            const firstRender = () => {
                return currentUnique
                    .map(
                        (
                            /** @type{any} */ item,
                            /** @type{number} */ index
                        ) => {
                            const sync = /* HTML */ `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                                {
                                    current: item,
                                    index: index,
                                }
                            )}"
                            ${ATTR_KEY}="${hasKey ? item?.[key] : ''}"
                            ${ATTR_REPEATER_PROP_BIND}="${stateToWatch}"
                            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

                            return render({
                                sync,
                                index,
                                currentValue: item,
                                html: renderHtml,
                            });
                        }
                    )
                    .join('');
            };

            /**
             * When repeater is inizilized runtime, all neseted repater is initialized.
             * Fire each repeater once.
             */
            let isInizialized = false;

            setRepeatFunction({
                id,
                repeatId,
                fn: () => {
                    if (isInizialized) return;

                    /**
                     * Fire invalidate id after component parse
                     * If function is fired runtime inside ad another repater
                     * the parent is not this scoe component.
                     * find component that use this repeater id and get the parent.
                     */
                    inizializeRepeatWatch({
                        repeatId,
                        state: stateToWatch,
                        setState,
                        emit,
                        watch,
                        clean,
                        beforeUpdate,
                        afterUpdate,
                        key,
                        id,
                        render,
                    });

                    isInizialized = true;
                },
            });

            return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${firstRender()}`;
        },
    };
};
