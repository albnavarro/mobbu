// @ts-check

import { mobCore } from '../../mobCore';
import { getChildrenIdByName } from '../componentStore/action/children';
import { setRepeaterStateById } from '../componentStore/action/currentRepeatValue';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import {
    addSelfToParentComponent,
    getParentIdById,
    setParentsComponent,
} from '../componentStore/action/parent';
import { setDynamicPropsWatch, unBind } from '../componentStore/action/props';
import {
    removeAndDestroyById,
    removeOrphanComponent,
} from '../componentStore/action/removeAndDestroy';
import { watchById } from '../componentStore/action/watch';
import {
    ATTR_BIND_EVENTS,
    ATTR_DYNAMIC,
    ATTR_PARENT_ID,
    ATTR_PROPS,
    ATTR_REPEATID,
    ATTR_WEAK_BIND_EVENTS,
} from '../constant';
import { setBindEvents } from '../temporaryData/bindEvents';
import {
    addCurrentIdToDynamicProps,
    setBindProps,
} from '../temporaryData/dynamicProps';
import { addOnMoutCallback } from '../temporaryData/onMount';
import { addRepeat } from '../temporaryData/repeater/add';
import { setStaticProps } from '../temporaryData/staticProps';
import { setDelegateBindEvent } from '../temporaryData/weakBindEvents';
import { renderHtml } from './utils';

// JSDOC usare inferred type quando possible.

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
    dynamicPropsId,
    dynamicPropsIdFromSlot,
    currentRepeatValue,
    bindEventsId,
}) => {
    /**
     * Update Parent id before render, do child can use immediately parentId.
     */
    setParentsComponent({ componentId: id });

    /**
     * Update to parent component child array.
     */
    addSelfToParentComponent({ id });

    const repeatIdArray = [];
    const getChildren = (/** @type {string} */ componentName) =>
        getChildrenIdByName({ id, componentName });

    /**
     * Set initial repate list current value to pass to dynamicProps.
     * When component is created.
     */
    if (currentRepeatValue?.index !== -1)
        setRepeaterStateById({ id, value: currentRepeatValue });

    /**
     * Initialize dynamic props and
     * set initial state.
     */
    addCurrentIdToDynamicProps({
        propsId: dynamicPropsId,
        componentId: id,
    });

    addCurrentIdToDynamicProps({
        propsId: dynamicPropsIdFromSlot,
        componentId: id,
    });

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
        getChildren,
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
        syncParent: ` ${ATTR_PARENT_ID}="${id}" `,
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
                    getChildren,
                    key,
                    id,
                    render,
                },
            });

            return `<mobjs-repeater ${ATTR_REPEATID}="${currentRepeatId}" style="display:none;"/>`;
        },
    };
};
