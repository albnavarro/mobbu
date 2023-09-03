// @ts-check

import { getUnivoqueId } from '../../mobMotion/animation/utils/animationUtils';
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
import { ATTR_DYNAMIC, ATTR_PROPS, ATTR_REPEATID } from '../constant';
import { addRepeat } from '../mainStore/actions/addRepeat';
import { addOnMoutCallback } from '../mainStore/actions/onMount';
import {
    addCurrentIdToDynamicProps,
    setBindProps,
    setStaticProps,
} from '../mainStore/actions/props';
import {
    instanceName as setInstanceName,
    slotName as setSlotName,
    useSlot,
} from '../utils';
import { convertToGenericElement } from './convertToGenericElement';
import { removeWatchFromDynamicProps } from './utils';

// JSDOC usare infered type quando possibile.

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @param {Object} obj.state
 * @param {Object} obj.props
 * @returns Object
 *
 * @description
 * Create component
 * Reuturn all prosps/method for user function.
 */
export const registerGenericElement = ({ component, state = {} }) => {
    /**
     * Create basic DOM element
     */
    const {
        placeholderElement,
        props: propsUpdated,
        id,
        componentName,
        instanceName,
        key,
        dynamicPropsId,
        dynamicPropsIdFromSlot,
        currentListValueReal,
    } = convertToGenericElement({
        component,
    });

    /**
     * Register component to store
     */
    const { getState, setState, emit, emitAsync, computed, watch } =
        addComponentToStore({
            component,
            placeholderElement,
            props: propsUpdated,
            state,
            destroy: () => {},
            id,
            componentName,
            instanceName,
            key,
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
        key,
        id,
        placeholderElement,
        getState,
        setState,
        emit,
        emitAsync,
        computed,
        watch,
        repeatId,
        getChildren,
        instanceName: (name = '') => setInstanceName(name),
        slotName: (/** @type{String} */ slotName) => setSlotName(slotName),
        useSlot: (/** @type{String} */ slotName) => useSlot(slotName),
        freezeProp: (/** @type{String} */ prop) => freezePropById({ id, prop }),
        unFreezeProp: (/** @type{String} */ prop) =>
            unFreezePropById({ id, prop }),
        unBind: () => unBind({ id }),
        bindProps: (
            /** @type{{bind:Array<String>,props:() => Object}} */ obj
        ) =>
            ` ${ATTR_DYNAMIC}="${setBindProps({
                ...obj,
                ...{ parentId: id },
            })}" `,
        staticProps: (/** @type{{String: any}} */ obj) =>
            ` ${ATTR_PROPS}="${setStaticProps(obj)}" `,
        remove: () => removeAndDestroyById({ id }),
        getParentId: () => getParentIdById(id),
        watchParent: (/** @type{String} */ prop, /** @type{Function} */ cb) =>
            watchById(getParentIdById(id), prop, cb),
        render: (/** @type{String} */ content) => {
            return {
                id,
                content,
                placeholderElement,
            };
        },
        onMount: (/** @type{Function} */ cb) => addOnMoutCallback({ id, cb }),
        repeat: ({
            watch: stateToWatch = undefined, // use alias to maintain ured naming convention.
            component: targetComponent = '', // use alias to maintain ured naming convention.
            props = () => {},
            clean = false,
            bindProps: dynamicProps = undefined, // use alias to maintain ured naming convention.
            beforeUpdate = () => {},
            afterUpdate = () => {},
            key = undefined,
        }) => {
            const currentRepeatId = getUnivoqueId();
            repeatId.push(currentRepeatId);

            /**
             * Remove watch state from bind.
             */
            const dynamicPropsSanitized = removeWatchFromDynamicProps({
                dynamicProps,
                stateToWatch,
            });

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
                    dynamicProps: dynamicPropsSanitized,
                    beforeUpdate,
                    afterUpdate,
                    getChildren,
                    key,
                    id,
                },
            });

            return `<span ${ATTR_REPEATID}="${currentRepeatId}" style="display:none;"/>`;
        },
    };
};
