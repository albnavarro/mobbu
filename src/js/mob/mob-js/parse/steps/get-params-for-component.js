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
import { inizializeInvalidateWatch } from '../../modules/invalidate/action/inizialize-invalidate-watch';
import { parseObserveInvalidate } from '../../modules/invalidate/action/parse-bindprop-invalidate';
import { setInvalidateInitializeFunction } from '../../modules/invalidate/action/set-invalidate-function';
import { setInvalidateInstancesMapInitialized } from '../../modules/invalidate/action/set-invalidate-instances-map-initialized';
import { initializeInvalidateInstacesMap } from '../../modules/invalidate/action/set-invalidate-instances-map-scoped-id';
import { addOnMoutCallback } from '../../modules/on-mount';
import { inizializeRepeatWatch } from '../../modules/repeater/action/inizialize-repeat-watch';
import { setRepeaterNativeDOMChildren } from '../../modules/repeater/action/set-repeat-native-dom-children';
import { setRepeatFunction } from '../../modules/repeater/action/set-repeat-function';
import { setRepeaterInstancesMapInitialized } from '../../modules/repeater/action/set-repeater-instances-map-initialized';
import { setRepeaterInstancesDOMRender } from '../../modules/repeater/action/set-repeater-instances-map-initial-render';
import {
    getRenderWithoutSync,
    getRenderWithSync,
} from '../../modules/repeater/update/utils';
import { getUnivoqueByKey } from '../../modules/repeater/utils';
import { setStaticProps } from '../../modules/static-props';
import { repeaterhasComponentChildren } from '../../modules/repeater/action/set-repeat-component-children';
import { initializeRepeaterInstancesMap } from '../../modules/repeater/action/initialize-repeater-instances-map';
import { setRepeaterInstancesCurrentData } from '../../modules/repeater/action/set-repeat-instances-map-current-data';
import { initializeRepeaterIdsMap } from '../../modules/repeater/action/initialize-repeater-ids-map';
import { initializeInvalidateIdsMap } from '../../modules/invalidate/action/initialize-invalidate-ids-map';

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
            attachTo.insertAdjacentHTML(position, component);

            /**
             * Render
             */
            mainStore.set(
                MAIN_STORE_PARSER_ASYNC,
                {
                    element: attachTo,
                    parentId: id,
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
        bindProps: (data) => {
            /**
             * 'props' is required filed in explicit mode. If props is not used is in auto mode ( data is a function )
             */
            const dataNormalized = 'props' in data ? data : { props: data };

            return `${ATTR_BIND_PROPS}="${setBindProps({
                ...dataNormalized,
                parentId: id,
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
            addBindTextToInitialzie(bindTextId, {
                id,
                render,
                props: values,
            });

            return `<mobjs-bind-text ${ATTR_COMPONENT_ID}="${id}" ${ATTR_BIND_TEXT_ID}="${bindTextId}"></mobjs-bind-text>${render()}`;
        },
        bindObject: (strings, ...values) => {
            const keys = getBindObjectKeys(values);
            const bindObjectId = MobCore.getUnivoqueId();
            const render = () => renderBindObject(strings, ...values);
            addBindObjectToInitialzie(bindObjectId, { id, keys, render });

            return `<mobjs-bind-object ${ATTR_COMPONENT_ID}="${id}" ${ATTR_BIND_OBJECT_ID}="${bindObjectId}"></mobjs-bind-object>${render()}`;
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
            const sync = `${ATTR_INVALIDATE}=${invalidateId}`;
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

            return `<mobjs-invalidate ${sync} style="display:none;"></mobjs-invalidate>${invalidateRender()}`;
        },
        repeat: (
            /** @type {import('./type').RepeatInternal} */ {
                observe,
                clean = false,
                beforeUpdate = () => Promise.resolve(),
                afterUpdate = () => {},
                key = '',
                render,
                useSync = false,
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
             * Get first render if user use sync utils, fallback to empty string if not.
             *
             * - User add repeater attribute manually.
             * - Sync utils contains repeater attribute.
             * - Get first render in string format.
             */
            const initialStringRender = useSync
                ? getRenderWithSync({
                      currentUnique,
                      key,
                      observe: observeParsed,
                      repeatId,
                      hasKey,
                      render,
                  })
                : '';

            /**
             * Get first render if user do not use sync utils, fallback to empty array if not.
             *
             * - Here we need to add repeater attribute manually.
             * - Sync utils contains repeater attribute .
             * - Get first render in real DOM format
             */
            const initialDOMRender = useSync
                ? []
                : getRenderWithoutSync({
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
             * Set first render in repeatInstancesMap.
             *
             * Render is a string:
             *
             * - Add empty array.
             * - Dom is added in return function as string and will render normally.
             *
             * Render is a DOM collection:
             *
             * - Add all element to initialRenderWithoutSync prop in repeatInstancesMap.
             * - Will be added to DOM in setParentRepeater() function.
             * - SetParentRepeater is fired when `mobjs-repeat` customComponent is added to the DOM.
             */
            setRepeaterInstancesDOMRender({
                repeatId,
                initialDOMRender,
            });

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
                        useSync,
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

            return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${initialStringRender}`;
        },
    };
};
