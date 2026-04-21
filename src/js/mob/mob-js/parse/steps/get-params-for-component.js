import { MobCore, MobDetectBindKey } from '../../../mob-core';
import { getChildrenIdByName } from '../../component/action/children';
import { componentIsPersistent } from '../../component/action/component';
import {
    freezePropById,
    unFreezePropById,
} from '../../component/action/freeze';
import { addMethodById } from '../../component/action/methods';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch, unBind } from '../../component/action/props';
import { destroyComponentInsideNodeById } from '../../component/action/remove-and-destroy/destroy-component-inside-node-by-id';
import { removeAndDestroyById } from '../../component/action/remove-and-destroy/remove-and-destroy-by-id';
import { watchById } from '../../component/action/watch';
import {
    ATTR_BIND_EFFECT,
    ATTR_BIND_EVENTS,
    ATTR_BIND_OBJECT_ID,
    ATTR_BIND_PROPS,
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_BIND_TEXT_ID,
    ATTR_COMPONENT_ID,
    ATTR_INVALIDATE,
    ATTR_MOBJS_REPEAT,
    ATTR_PROPS,
    ATTR_WEAK_BIND_EVENTS,
} from '../../constant';
import {
    MAIN_STORE_PARSER_ASYNC,
    PARSER_ASYNC_RENDER_COMPONENT,
} from '../../main-store/constant';
import {
    mainStore,
    resetMainStoreAsyncParser,
} from '../../main-store/main-store';
import { setBindEffect } from '../../modules/bind-effetc';
import { setBindEvents } from '../../modules/bind-events';
import {
    addBindObjectToInitialzie,
    getBindObjectKeys,
    renderBindObject,
} from '../../modules/bind-object';
import { setBindProps } from '../../modules/bind-props';
import { getBindRefById, getBindRefsById } from '../../modules/bind-refs';
import {
    addBindTextToInitialzie,
    renderBindText,
} from '../../modules/bind-text';
import { setDelegateBindEvent } from '../../modules/delegate-events';
import { inizializeInvalidateWatch } from '../../modules/invalidate/action/initialize/inizialize-invalidate-watch';
import { parseObserveInvalidate } from '../../modules/invalidate/action/parse-bindprop-invalidate';
import { setInvalidateInitializeFunction } from '../../modules/invalidate/action/set/set-invalidate-function';
import { setInvalidateInstancesMapInitialized } from '../../modules/invalidate/action/set/set-invalidate-instances-map-initialized';
import { initializeInvalidateInstacesMap } from '../../modules/invalidate/action/set/set-invalidate-instances-map-scoped-id';
import { addOnMoutCallback } from '../../modules/on-mount';
import { inizializeRepeatWatch } from '../../modules/repeater/action/initialize/inizialize-repeat-watch';
import { setRepeaterNativeDOMChildren } from '../../modules/repeater/action/set/set-repeat-native-dom-children';
import { setRepeatFunction } from '../../modules/repeater/action/set/set-repeat-function';
import { setRepeaterInstancesMapInitialized } from '../../modules/repeater/action/set/set-repeater-instances-map-initialized';
import { getRepeatIntialRender } from '../../modules/repeater/update/utils';
import { getUnivoqueByKey } from '../../modules/repeater/utils';
import { setStaticProps } from '../../modules/static-props';
import { repeaterhasComponentChildren } from '../../modules/repeater/action/set/set-repeat-component-children';
import { initializeRepeaterInstancesMap } from '../../modules/repeater/action/initialize/initialize-repeater-instances-map';
import { setRepeaterInstancesCurrentData } from '../../modules/repeater/action/set/set-repeat-instances-map-current-data';
import { initializeRepeaterIdsMap } from '../../modules/repeater/action/initialize/initialize-repeater-ids-map';
import { initializeInvalidateIdsMap } from '../../modules/invalidate/action/initialize/initialize-invalidate-ids-map';

/**
 * Create component Reuturn all prosps/method for user function.
 *
 * @param {import('./type').GetParamsForComponent} obj.state
 * @returns {import('../../type').ComponentPropsType<
 *     import('../../type').MobComponentMap,
 *     import('../../type').MobComponentMap
 * >}
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
        }) => {
            /**
             * Remove all children inside attachTo. If needed.
             */
            if (clean) {
                destroyComponentInsideNodeById({ id, container: attachTo });
                attachTo.textContent = '';
            }

            /**
             * Attach new component
             */
            if (MobCore.checkType(String, component)) {
                attachTo.insertAdjacentHTML(
                    position,
                    /** @type {string} */ (component)
                );
            } else {
                attachTo.insertAdjacentElement(
                    position,
                    /** @type {any} */ (component)
                );
            }

            /**
             * Render
             */
            mainStore.set(
                MAIN_STORE_PARSER_ASYNC,
                {
                    element: attachTo,
                    persistent: componentIsPersistent(id),
                    source: PARSER_ASYNC_RENDER_COMPONENT,
                },
                { emit: false }
            );

            await mainStore.emitAsync(MAIN_STORE_PARSER_ASYNC);
            resetMainStoreAsyncParser();

            return;
        },
        getChildren: (/** @type {string} */ componentName) => {
            return getChildrenIdByName({ id, componentName });
        },
        /**
         * Ts issue, prop coem as string\number\symbol, convert in string.
         */
        freezeProp: (/** @type{string | (() => any)} */ prop) => {
            const bindParsed = MobDetectBindKey.extractkeyFromProp(prop);
            return freezePropById({ id, prop: bindParsed.toString() });
        },
        unFreezeProp: (/** @type{string | (() => any)} */ prop) => {
            const bindParsed = MobDetectBindKey.extractkeyFromProp(prop);
            return unFreezePropById({ id, prop: bindParsed.toString() });
        },
        unBind: () => unBind({ id }),
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
        addMethod: (name, fn) => {
            addMethodById({ id, name, fn });
        },
        getRef: () => {
            return getBindRefById({ id });
        },
        getRefs: () => {
            return getBindRefsById({ id });
        },

        /**
         * Modules
         */
        setRef: (value) => {
            return {
                [ATTR_BIND_REFS_ID]: id,
                [ATTR_BIND_REFS_NAME]: value,
            };
        },
        staticProps: (obj) => ({
            [ATTR_PROPS]: setStaticProps(obj),
        }),
        bindProps: (data) => {
            /**
             * 'props' is required filed in explicit mode. If props is not used is in auto mode ( data is a function )
             */
            const dataNormalized = 'props' in data ? data : { props: data };

            const value = setBindProps({
                ...dataNormalized,
                parentId: id,
            });

            if (!value) return {};

            return {
                [ATTR_BIND_PROPS]: value,
            };
        },
        bindEffect: (effectData) => {
            return {
                [ATTR_BIND_EFFECT]: setBindEffect({ data: effectData, id }),
            };
        },
        bindEvents: (eventsData) => {
            return {
                [ATTR_BIND_EVENTS]: setBindEvents(eventsData),
            };
        },
        delegateEvents: (eventsData) => {
            return {
                [ATTR_WEAK_BIND_EVENTS]: setDelegateBindEvent(eventsData),
            };
        },

        /**
         * Content
         */
        bindText: (strings, ...values) => {
            const bindTextId = MobCore.getUnivoqueId();
            const render = () => renderBindText(id, strings, ...values);
            addBindTextToInitialzie(bindTextId, {
                id,
                render,
                props: values,
            });

            const webComponent = document.createElement('mobjs-bind-text');
            webComponent.setAttribute(ATTR_COMPONENT_ID, id);
            webComponent.setAttribute(ATTR_BIND_TEXT_ID, bindTextId);
            return [webComponent, render()];
        },
        bindObject: (strings, ...values) => {
            const keys = getBindObjectKeys(values);
            const bindObjectId = MobCore.getUnivoqueId();
            const render = () => renderBindObject(strings, ...values);
            addBindObjectToInitialzie(bindObjectId, { id, keys, render });

            const webComponent = document.createElement('mobjs-bind-object');
            webComponent.setAttribute(ATTR_COMPONENT_ID, id);
            webComponent.setAttribute(ATTR_BIND_OBJECT_ID, bindObjectId);
            return [webComponent, render()];
        },
        invalidate: ({
            observe,
            render,
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
        }) => {
            /**
             * Check if observe prop is a string or a proxi object and convert in Array
             */
            const observeParsed = parseObserveInvalidate(observe);
            const invalidateId = MobCore.getUnivoqueId();
            const invalidateRender = () => render();

            /**
             * Flag to ensure that initialize function is fired once.
             */
            let isInizialized = false;

            /**
             * Add current invalidate id to invalidateIdsMap.
             *
             * - InvalidateIdsMap store all invalidate id for each component.
             */
            initializeInvalidateIdsMap({ invalidateId, scopeId: id });

            /**
             * Initialize invalidateInstancesMap
             *
             * - Key: invalidateId.
             * - ScopeId.
             * - Observed state
             * - Initialized is set to false.
             * - Other value is default value.
             */
            initializeInvalidateInstacesMap({
                invalidateId,
                scopeId: id,
                observe: observeParsed,
            });

            /**
             * Initialize module.
             *
             * - Enable watch utils to update current invalidate.
             */
            setInvalidateInitializeFunction({
                invalidateId,
                initializeModule: () => {
                    if (isInizialized) return;

                    /**
                     * Enable watch to update invalidate.
                     */
                    inizializeInvalidateWatch({
                        observe: /** @type {string[]} */ (observeParsed),
                        watch,
                        beforeUpdate,
                        afterUpdate,
                        persistent: componentIsPersistent(id),
                        id,
                        invalidateId,
                        renderFunction: invalidateRender,
                    });

                    isInizialized = true;

                    /**
                     * Set isInizialized to true
                     */
                    setInvalidateInstancesMapInitialized({
                        invalidateId,
                    });
                },
            });

            const webComponent = document.createElement('mobjs-invalidate');
            webComponent.setAttribute(ATTR_INVALIDATE, invalidateId);

            const rawRender = invalidateRender();
            const renderArray = /** @type {HTMLElement[]} */ (
                MobCore.checkType(Array, rawRender) ? rawRender : [rawRender]
            );

            return [webComponent, ...renderArray];
        },
        repeat: (
            /** @type {import('./type').RepeatInternal} */ {
                observe,
                clean = false,
                beforeUpdate = () => Promise.resolve(),
                afterUpdate = () => {},
                key = '',
                render,
            }
        ) => {
            /**
             * Check if observe prop is a string or a proxi object
             */
            const observeParsed = MobDetectBindKey.extractkeyFromProp(observe);
            const repeatId = MobCore.getUnivoqueId();
            const hasKey = key !== '';

            /**
             * Add current repeat id to repeatIdsMap.
             *
             * - RepeatIdsMap store all repeat id for each component.
             */
            initializeRepeaterIdsMap({ repeatId, scopeId: id });

            /**
             * Initialize repeatInstancesMap.
             *
             * - Key: repeatId.
             * - ScopeId.
             * - Observed state
             * - Initialized is set to false.
             * - Other value is default value.
             */
            initializeRepeaterInstancesMap({
                repeatId,
                scopeId: id,
                observe: observeParsed,
            });

            /** @type{Record<string, any>[]} */
            const initialState = getState()?.[observeParsed];
            const currentUnique = hasKey
                ? getUnivoqueByKey({ data: initialState, key })
                : initialState;

            /**
             * Add first dataset in repeatInstancesMap.
             *
             * - Key is filtered by univique key
             */
            setRepeaterInstancesCurrentData({
                repeatId,
                currentData: currentUnique,
            });

            /**
             * Get first render if user do not use sync utils, fallback to empty array if not.
             *
             * - Here we need to add repeater attribute manually.
             * - Sync utils contains repeater attribute .
             * - Get first render in real DOM format
             */
            const initialDOMRender = getRepeatIntialRender({
                currentUnique,
                render,
                observe: observeParsed,
                repeatId,
                key,
                hasKey,
            });

            /**
             * Flag to ensure that initialize function is fired once.
             */
            let isInizialized = false;

            /**
             * Initialize module.
             *
             * - Enable watch utils update current repeat
             * - Set first child element in repeatInstancesMap if no component is used.
             */
            setRepeatFunction({
                repeatId,
                initializeModule: () => {
                    if (isInizialized) return;

                    /**
                     * Enable watch to update repeat.
                     */
                    inizializeRepeatWatch({
                        repeatId,
                        persistent: componentIsPersistent(id),
                        state: observeParsed,
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

                    /**
                     * Set isInizialized to true
                     */
                    setRepeaterInstancesMapInitialized({
                        repeatId,
                    });

                    /**
                     * If repeater has no component inside, get DOM node get children inside node and save in
                     * nativeDOMChildren.
                     */
                    if (!repeaterhasComponentChildren({ repeatId })) {
                        setRepeaterNativeDOMChildren({
                            repeatId,
                            id,
                        });
                    }
                },
            });

            const webComponent = document.createElement('mobjs-repeat');
            webComponent.setAttribute(ATTR_MOBJS_REPEAT, repeatId);
            return [webComponent, ...initialDOMRender];
        },
    };
};
