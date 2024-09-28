// @ts-check

import { mobCore } from '../../../mobCore';
import { getChildrenIdByName } from '../../component/action/children';
import {
    inizializeRepeatWatch,
    setRepeatFunction,
} from '../../modules/repeater';
import {
    freezePropById,
    unFreezePropById,
} from '../../component/action/freeze';
import {
    inizializeInvalidateWatch,
    setInvalidateFunction,
} from '../../modules/invalidate';
import { getParentIdById } from '../../component/action/parent';
import { setDynamicPropsWatch, unBind } from '../../component/action/props';
import {
    destroyComponentInsideNodeById,
    removeAndDestroyById,
} from '../../component/action/removeAndDestroy';
import { watchById } from '../../component/action/watch';
import {
    ATTR_BIND_EVENTS,
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_CHILD_REPEATID,
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

/**
 * @param {import('./type').getParamsForComponent} obj.state
 * @returns {import('../../type').componentPropsType}
 *
 * @description
 * Create component
 * Reuturn all prosps/method for user function.
 */
export const getParamsForComponentFunction = ({
    getState,
    setState,
    updateState,
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
     */
    const repeatIdArray = [];

    return {
        bindEventsId,
        key,
        id,
        getState,
        setState,
        updateState,
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
            return Promise.resolve(renderHtml(strings, ...values));
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
        getRef: () => ({
            test: document.createElement('div'),
        }),
        getRefs: () => ({
            test: [document.createElement('div')],
        }),
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
                        bind: /** @type{Array<string>} */ (
                            mobCore.checkType(Array, bind) ? bind : [bind]
                        ),
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
            bind,
            clean = false,
            beforeUpdate = () => Promise.resolve(),
            afterUpdate = () => {},
            key,
            render,
        }) => {
            const repeatId = mobCore.getUnivoqueId();
            const hasKey = key && key !== '';
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
                },
            });

            return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${firstRender()}`;
        },
    };
};
