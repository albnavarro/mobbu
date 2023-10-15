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
import {
    removeAndDestroyById,
    removeOrphanComponent,
} from '../componentStore/action/removeAndDestroy';
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
import { renderHtml } from './utils';

// JSDOC usare inferred type quando possible.

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @param {Object} obj.state
 * @param {Boolean} obj.isCancellable
 * @returns {import('../type').componentType}
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
        parentId,
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
            parentId,
        });

    /**
     * Update Parent id before render, do child can use immediately parentId.
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
        componentParsed,
        getState,
        setState,
        emit,
        emitAsync,
        computed,
        watch,
        repeatId,
        getChildren,
        watchSync: (state, callback) => {
            const unsubscribe = watch(state, callback);
            emit(state);
            return unsubscribe;
        },
        instanceName: (name = '') => setInstanceName(name),
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
        remove: () => removeAndDestroyById({ id }),
        removeDOM: (element) => {
            element.remove();
            removeOrphanComponent();
        },
        getParentId: () => getParentIdById(id),
        watchParent: (prop, cb) => watchById(getParentIdById(id), prop, cb),
        html: (strings, ...values) => {
            return {
                id,
                content: renderHtml(strings, ...values),
                componentParsed,
            };
        },

        onMount: (cb) => addOnMoutCallback({ id, cb }),
        bindEvents: (eventsData) => {
            return `${ATTR_BIND_EVENTS}="${setBindEvents(eventsData)}"`;
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
            repeatId.push(currentRepeatId);

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
