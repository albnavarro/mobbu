// @ts-check

import { MobCore } from '../../../mob-core';
import { getChildrenIdByName } from '../../component/action/children';
import { setRepeatFunction } from '../../modules/repeater/action/set-repeat-function';
import { setRepeaterPlaceholderMapScopeId } from '../../modules/repeater/action/set-repeater-placeholder-map-scope-id';
import { setRepeaterPlaceholderMapInitialized } from '../../modules/repeater/action/set-repeater-placeholder-map-initialized';
import {
    freezePropById,
    unFreezePropById,
} from '../../component/action/freeze';
import { inizializeInvalidateWatch } from '../../modules/invalidate/action/inizialize-invalidate-watch';
import { setInvalidateFunction } from '../../modules/invalidate/action/set-invalidate-function';
import { setInvalidatePlaceholderMapInitialized } from '../../modules/invalidate/action/set-invalidate-placeholder-map-initialized';
import { setInvalidatePlaceholderMapScopedId } from '../../modules/invalidate/action/set-invalidate-placeholder-map-scoped-id';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch, unBind } from '../../component/action/props';
import { destroyComponentInsideNodeById } from '../../component/action/removeAndDestroy/destroy-component-inside-node-by-id';
import { removeAndDestroyById } from '../../component/action/removeAndDestroy/remove-and-destroy-by-id';
import { watchById } from '../../component/action/watch';
import {
    ATTR_BIND_EFFECT,
    ATTR_BIND_EVENTS,
    ATTR_BIND_OBJECT_ID,
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_BIND_TEXT_ID,
    ATTR_COMPONENT_ID,
    ATTR_BIND_PROPS,
    ATTR_INVALIDATE,
    ATTR_MOBJS_REPEAT,
    ATTR_PROPS,
    ATTR_WEAK_BIND_EVENTS,
} from '../../constant';
import { MAIN_STORE_ASYNC_PARSER } from '../../mainStore/constant';
import { mainStore } from '../../mainStore/main-store';
import { setBindEvents } from '../../modules/bindEvents';
import { setBindProps } from '../../modules/bindProps';
import { addOnMoutCallback } from '../../modules/onMount';
import { setStaticProps } from '../../modules/staticProps';
import { setDelegateBindEvent } from '../../modules/delegateEvents';
import { getUnivoqueByKey } from '../../modules/repeater/utils';
import { addMethodById } from '../../component/action/methods';
import { getBindRefById, getBindRefsById } from '../../modules/bindRefs';
import { createBindTextWatcher, renderBindText } from '../../modules/bindtext';
import { inizializeRepeatWatch } from '../../modules/repeater/action/inizialize-repeat-watch';
import {
    createBindObjectWatcher,
    getBindObjectKeys,
    renderBindObject,
} from '../../modules/bindObject';
import { setSkipAddUserComponent } from '../../modules/userComponent';
import {
    getRenderWithoutSync,
    getRenderWithSync,
} from '../../modules/repeater/update/utils';
import { setRepeaterChild } from '../../modules/repeater/action/set-repeat-child';
import { setBindEffect } from '../../modules/bindEffect';
import { componentIsPersistent } from '../../component/action/component';

/**
 * @param {import('./type').GetParamsForComponent} obj.state
 * @returns {import('../../type').ComponentPropsType<import('../../type').MobComponentMap, import('../../type').MobComponentMap>}
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
    bindStore,
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
        bindStore,
        debug,
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
                {
                    element: attachTo,
                    parentId: id,
                    persistent: componentIsPersistent(id),
                },
                { emit: false }
            );
            return mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);
        },
        getChildren: (/** @type{string} */ componentName) => {
            return getChildrenIdByName({ id, componentName });
        },
        /**
         * ts issue, prop coem as string\number\symbol, convert in string.
         */
        freezeProp: (prop) => freezePropById({ id, prop: prop.toString() }),
        unFreezeProp: (prop) => unFreezePropById({ id, prop: prop.toString() }),
        unBind: () => unBind({ id }),
        bindProps: (data) => {
            /**
             * 'props' is required filed in explicit mode.
             * If props is not used is in auto mode ( data is a function )
             */
            const dataNormalized = 'props' in data ? data : { props: data };

            return `${ATTR_BIND_PROPS}="${setBindProps({
                ...dataNormalized,
                parentId: dataNormalized?.forceParent ? undefined : id,
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

            if (unsubscribeParent)
                setDynamicPropsWatch({ id, unWatchArray: [unsubscribeParent] });
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
        bindEffect: (effectData) => {
            return `${ATTR_BIND_EFFECT}="${setBindEffect({ data: effectData, id })}"`;
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
            const bindTextId = MobCore.getUnivoqueId();
            const render = () => renderBindText(id, strings, ...values);
            createBindTextWatcher(id, bindTextId, render, ...values);

            return `<mobjs-bind-text ${ATTR_COMPONENT_ID}="${id}" ${ATTR_BIND_TEXT_ID}="${bindTextId}"></mobjs-bind-text>${render()}`;
        },
        bindObject: (strings, ...values) => {
            const keys = getBindObjectKeys(values);
            const bindObjectId = MobCore.getUnivoqueId();
            const render = () => renderBindObject(strings, ...values);
            createBindObjectWatcher(id, bindObjectId, keys, render);

            return `<mobjs-bind-object ${ATTR_COMPONENT_ID}="${id}" ${ATTR_BIND_OBJECT_ID}="${bindObjectId}"></mobjs-bind-object>${render()}`;
        },
        invalidate: ({
            bind,
            render,
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
        }) => {
            const invalidateId = MobCore.getUnivoqueId();
            const sync = `${ATTR_INVALIDATE}=${invalidateId}`;
            const invalidateRender = () => render();

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
                            MobCore.checkType(Array, bind) ? bind : [bind]
                        ),
                        watch,
                        beforeUpdate,
                        afterUpdate,
                        persistent: componentIsPersistent(id),
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
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
            key = '',
            render,
            useSync = false,
        }) => {
            const repeatId = MobCore.getUnivoqueId();
            const hasKey = key !== '';

            /** type @type{Record<string, any>[]} */
            const initialState = getState()?.[bind];
            const currentUnique = hasKey
                ? getUnivoqueByKey({ data: initialState, key })
                : initialState;

            setSkipAddUserComponent(true);

            const initialRender = useSync
                ? getRenderWithSync({
                      id,
                      currentUnique,
                      key,
                      bind,
                      repeatId,
                      hasKey,
                      render,
                  })
                : getRenderWithoutSync({
                      id,
                      currentUnique,
                      render,
                      bind,
                      repeatId,
                      key,
                      hasKey,
                  });

            setSkipAddUserComponent(false);

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
                        persistent: componentIsPersistent(id),
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
                        useSync,
                    });

                    isInizialized = true;

                    setRepeaterPlaceholderMapInitialized({
                        repeatId,
                    });

                    setRepeaterChild({ repeatId, id, bind });
                },
            });

            return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${initialRender}`;
        },
    };
};
