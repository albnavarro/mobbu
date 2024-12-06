// @ts-check

import { mobCore } from '../../../mobCore';
import { getChildrenIdByName } from '../../component/action/children';
import { setRepeatFunction } from '../../modules/repeater/action/setRepeatFunction';
import { setRepeaterPlaceholderMapScopeId } from '../../modules/repeater/action/setRepeaterPlaceholderMapScopeId';
import { setRepeaterPlaceholderMapInitialized } from '../../modules/repeater/action/setRepeaterPlaceholderMapInitialized';
import {
    freezePropById,
    unFreezePropById,
} from '../../component/action/freeze';
import { inizializeInvalidateWatch } from '../../modules/invalidate/action/inizializeInvalidateWatch';
import { setInvalidateFunction } from '../../modules/invalidate/action/setInvalidateFunction';
import { setInvalidatePlaceholderMapInitialized } from '../../modules/invalidate/action/setInvalidatePlaceholderMapInitialized';
import { setInvalidatePlaceholderMapScopedId } from '../../modules/invalidate/action/setInvalidatePlaceholderMapScopedId';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch, unBind } from '../../component/action/props';
import { destroyComponentInsideNodeById } from '../../component/action/removeAndDestroy/destroyComponentInsideNodeById';
import { removeAndDestroyById } from '../../component/action/removeAndDestroy/removeAndDestroyById';
import { watchById } from '../../component/action/watch';
import {
    ATTR_BIND_EVENTS,
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_BIND_TEXT_ID,
    ATTR_CHILD_REPEATID,
    ATTR_COMPONENT_ID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_INVALIDATE,
    ATTR_KEY,
    ATTR_MOBJS_REPEAT,
    ATTR_PROPS,
    ATTR_REPEATER_PROP_BIND,
    ATTR_WEAK_BIND_EVENTS,
} from '../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/mainStore';
import { setBindEvents } from '../../modules/bindEvents';
import { setBindProps } from '../../modules/bindProps';
import { addOnMoutCallback } from '../../modules/onMount';
import { setStaticProps } from '../../modules/staticProps';
import { setDelegateBindEvent } from '../../modules/delegateEvents';
import { renderHtml } from './utils';
import { setComponentRepeaterState } from '../../modules/repeater/repeaterValue';
import { getUnivoqueByKey } from '../../modules/repeater/utils';
import { addMethodById } from '../../component/action/methods';
import { getBindRefById, getBindRefsById } from '../../modules/bindRefs';
import { createBindTextWatcher, renderBindText } from '../../modules/bindtext';
import { inizializeRepeatWatch } from '../../modules/repeater/action/inizializeRepeatWatch';

/**
 * @param {import('./type').getParamsForComponent} obj.state
 * @returns {import('../../type').componentPropsType<import('../../type').MobComponentMap, import('../../type').MobComponentMap>}
 *
 * @description
 * Create component
 * Reuturn all prosps/method for user function.
 */
export const getParamsForComponentFunction = ({
    getState,
    setState,
    updateState,
    getProxi,
    emit,
    emitAsync,
    computed,
    watch,
    id,
    key,
    bindEventsId,
    debug,
}) => {
    /**
     * @description
     * Initialize repeatId collector.
     *
     * @type {string[]}
     */
    const repeatIdArray = [];

    return {
        bindEventsId,
        key,
        id,
        getState,
        setState,
        updateState,
        getProxi,
        emit,
        emitAsync,
        computed,
        watch,
        debug,
        repeatIdArray,
        renderComponent: async ({
            attachTo,
            component,
            position = 'afterbegin',
            clean = true,
            persistent = false,
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
                { element: attachTo, parentId: id, persistent },
                { emit: false }
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
        computedSync: (state, dependencies, callback) => {
            const unsubscribe = computed(state, dependencies, callback);
            dependencies.forEach((state) => {
                emit(state);
            });

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
        addMethod: (name, fn) => {
            addMethodById({ id, name, fn });
        },
        setRef: (value) => {
            return `${ATTR_BIND_REFS_ID}="${id}" ${ATTR_BIND_REFS_NAME}="${value}"`;
        },
        getRef: () => {
            return getBindRefById({ id });
        },
        getRefs: () => {
            return getBindRefsById({ id });
        },
        bindText: (strings, ...values) => {
            const bindTextId = mobCore.getUnivoqueId();
            const render = () => renderBindText(id, strings, ...values);
            createBindTextWatcher(id, bindTextId, render, ...values);

            return `<mobjs-bind-text ${ATTR_COMPONENT_ID}="${id}" ${ATTR_BIND_TEXT_ID}="${bindTextId}"></mobjs-bind-text>${render()}`;
        },
        invalidate: ({
            bind,
            render,
            persistent = false,
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

            setInvalidatePlaceholderMapScopedId({ invalidateId, scopeId: id });

            setInvalidateFunction({
                id,
                invalidateId,
                fn: () => {
                    if (isInizialized) return;

                    /**
                     * Fire invalidate id after component parse
                     */
                    inizializeInvalidateWatch({
                        bind: /** @type{Array<string>} */ (
                            mobCore.checkType(Array, bind) ? bind : [bind]
                        ),
                        watch,
                        beforeUpdate,
                        afterUpdate,
                        persistent,
                        id,
                        invalidateId,
                        renderFunction: invalidateRender,
                    });

                    isInizialized = true;

                    setInvalidatePlaceholderMapInitialized({
                        invalidateId,
                    });
                },
            });

            return `<mobjs-invalidate ${sync} style="display:none;"></mobjs-invalidate>${invalidateRender()}`;
        },
        repeat: ({
            bind,
            clean = false,
            persistent = false,
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
            key,
            render,
        }) => {
            const repeatId = mobCore.getUnivoqueId();
            const hasKey = key && key !== '';

            /** type @type{Record<string, any>[]} */
            const initialState = getState()?.[bind];
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
                            const sync =
                                /* HTML */ () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                                    {
                                        current: item,
                                        index: index,
                                    }
                                )}"
                            ${ATTR_KEY}="${hasKey ? item?.[key] : ''}"
                            ${ATTR_REPEATER_PROP_BIND}="${bind}"
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

            setRepeaterPlaceholderMapScopeId({
                repeatId,
                scopeId: id,
            });

            setRepeatFunction({
                id,
                repeatId,
                fn: () => {
                    if (isInizialized) return;

                    /**
                     * Fire invalidate id after component parse
                     */
                    inizializeRepeatWatch({
                        repeatId,
                        persistent,
                        state: bind,
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

                    setRepeaterPlaceholderMapInitialized({
                        repeatId,
                    });
                },
            });

            return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${firstRender()}`;
        },
    };
};
