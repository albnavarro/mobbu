// @ts-check

import { mobCore } from '../../mobCore';
import { getChildrenIdByName } from '../componentStore/action/children';
import { setCurrentListValueById } from '../componentStore/action/currentListValue';
import {
    freezePropById,
    unFreezePropById,
} from '../componentStore/action/freeze';
import {
    addSelfToParentComponent,
    getParentIdById,
    setParentsComponent,
} from '../componentStore/action/parent';
import { unBind } from '../componentStore/action/props';
import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { watchById } from '../componentStore/action/watch';
import { addComponentToStore } from '../componentStore/registerComponent';
import {
    ATTR_BIND_EVENTS,
    ATTR_DYNAMIC,
    ATTR_PROPS,
    ATTR_REPEATID,
} from '../constant';
import { setBindEvents } from '../temporaryData/bindEvents';
import {
    addCurrentIdToDynamicProps,
    setBindProps,
} from '../temporaryData/dynamicProps';
import { addOnMoutCallback } from '../temporaryData/onMount';
import { addRepeat } from '../temporaryData/repeater/add';
import { setStaticProps } from '../temporaryData/staticProps';
import { instanceName as setInstanceName } from '../utils';
import { getComponentData } from './getComponentData';
import { removeWatchFromDynamicProps, renderHtml } from './utils';

// JSDOC usare infered type quando possibile.

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @param {Object} obj.state
 * @param {Boolean} obj.isCancellable
 * @returns Object
 *
 * @description
 * Create component
 * Reuturn all prosps/method for user function.
 */
export const registerComponent = ({
    component,
    state = {},
    isCancellable = true,
}) => {
    /**
     * Create basic DOM element
     */
    const {
        component: componentParsed,
        props: propsUpdated,
        id,
        componentName,
        instanceName,
        key,
        dynamicPropsId,
        dynamicPropsIdFromSlot,
        currentListValueReal,
        bindEventsId,
    } = getComponentData({
        component,
    });

    /**
     * Register component to store
     */
    const { getState, setState, emit, emitAsync, computed, watch } =
        addComponentToStore({
            component,
            componentParsed,
            props: propsUpdated,
            state,
            destroy: () => {},
            id,
            componentName,
            instanceName,
            key,
            isCancellable,
        });

    /**
     * Update Parent id before render, do child can use immediatly parentId.
     */
    setParentsComponent({ componentId: id });

    /**
     * Update to parent component child array.
     */
    addSelfToParentComponent({ id });

    const repeatId = [];
    const getChildren = (/** @type {String} */ component) =>
        getChildrenIdByName({ id, component });

    /**
     * Set initial repate list current value to pass to dynamicProps.
     * When component is created.
     */
    if (currentListValueReal?.index !== -1)
        setCurrentListValueById({ id, value: currentListValueReal });

    /**
     * Inizialize dynamic props and
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
        componentParsed,
        getState,
        setState,
        emit,
        emitAsync,
        computed,
        watch,
        repeatId,
        getChildren,
        watchSync: (/** @type{String} */ state, /** @type{any} */ callback) => {
            const unsubscribe = watch(state, callback);
            emit(state);
            return unsubscribe;
        },
        instanceName: (name = '') => setInstanceName(name),
        freezeProp: (/** @type{String} */ prop) => freezePropById({ id, prop }),
        unFreezeProp: (/** @type{String} */ prop) =>
            unFreezePropById({ id, prop }),
        unBind: () => unBind({ id }),
        bindProps: (
            /** @type{{bind:Array<String>,props:() => Object}} */ obj
        ) =>
            ` ${ATTR_DYNAMIC}="${setBindProps({
                ...obj,
                parentId: id,
            })}" `,
        staticProps: (/** @type{{String: any}} */ obj) =>
            ` ${ATTR_PROPS}="${setStaticProps(obj)}" `,
        remove: () => removeAndDestroyById({ id }),
        getParentId: () => getParentIdById(id),
        watchParent: (/** @type{String} */ prop, /** @type{Function} */ cb) =>
            watchById(getParentIdById(id), prop, cb),
        html: (
            /** @type{Array<String>} */ strings,
            /** @type{any} */ ...values
        ) => {
            return {
                id,
                content: renderHtml(strings, ...values),
                componentParsed,
            };
        },

        onMount: (/** @type{Function} */ cb) => addOnMoutCallback({ id, cb }),
        bindEvents: (/** @type{Array|Object} */ eventsData) => {
            return `${ATTR_BIND_EVENTS}="${setBindEvents(eventsData)}"`;
        },
        repeat: ({
            watch: stateToWatch, // use alias to maintain ured naming convention.
            component: targetComponent = '', // use alias to maintain ured naming convention.
            props = () => {},
            clean = false,
            // bindProps: bindPropsFromRepeater, // use alias to maintain ured naming convention.
            bindEvents: bindEventsFromRepeater,
            beforeUpdate = () => {},
            afterUpdate = () => {},
            key,
            render,
        }) => {
            const currentRepeatId = mobCore.getUnivoqueId();
            repeatId.push(currentRepeatId);

            /**
             * Remove watch state from bind.
             */
            // const dynamicPropsSanitized = removeWatchFromDynamicProps({
            //     dynamicProps: bindPropsFromRepeater,
            //     stateToWatch,
            // });

            addRepeat({
                repeatId: currentRepeatId,
                obj: {
                    state: stateToWatch,
                    setState,
                    emit,
                    watch,
                    targetComponent,
                    props,
                    clean,
                    // dynamicProps: dynamicPropsSanitized,
                    bindEvents: bindEventsFromRepeater,
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
