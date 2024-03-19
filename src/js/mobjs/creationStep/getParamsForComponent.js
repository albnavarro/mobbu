// @ts-check

import { mobCore } from '../../mobCore';
import { getChildrenIdByName } from '../componentStore/action/children';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import { getParentIdById } from '../componentStore/action/parent';
import { setDynamicPropsWatch, unBind } from '../componentStore/action/props';
import {
    removeAndDestroyById,
    removeOrphanComponent,
} from '../componentStore/action/removeAndDestroy';
import { watchById } from '../componentStore/action/watch';
import {
    ATTR_BIND_EVENTS,
    ATTR_DYNAMIC,
    ATTR_PROPS,
    ATTR_REPEATID,
    ATTR_WEAK_BIND_EVENTS,
} from '../constant';
import { MAIN_STORE_REPEATER_PARSER_ROOT } from '../mainStore/constant';
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
 * @returns {import('../type').componentType}
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
            if (clean) attachTo.textContent = '';
            attachTo.insertAdjacentHTML(position, component);

            mainStore.set(
                MAIN_STORE_REPEATER_PARSER_ROOT,
                { element: attachTo, parentId: id },
                false
            );
            return mainStore.emitAsync(MAIN_STORE_REPEATER_PARSER_ROOT);
        },
        getChildren: (/** @type{string} */ componentName) => {
            return getChildrenIdByName({ id, componentName });
        },
        watchSync: (state, callback) => {
            const unsubscribe = watch(state, callback);
            emit(state);
            return unsubscribe;
        },
        freezeProp: (prop) => freezePropById({ id, prop }),
        unFreezeProp: (prop) => unFreezePropById({ id, prop }),
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
            removeOrphanComponent();
        },
        removeDOM: (element) => {
            element.remove();
            removeOrphanComponent();
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

            return `<mobjs-repeater ${ATTR_REPEATID}="${currentRepeatId}" style="display:none;"/>`;
        },
    };
};
