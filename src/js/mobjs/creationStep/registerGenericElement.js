// @ts-check

import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
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
    ATTR_DYNAMIC,
    ATTR_PROPS,
    ATTR_REPEATID,
    ATTR_SLOT_NAME,
    ATTR_SLOT_POSITION,
} from '../constant';
import { addRepeat } from '../mainStore/actions/addRepeat';
import { addOnMoutCallback } from '../mainStore/actions/onMount';
import {
    addCurrentIdToDynamicProps,
    bindProps,
    staticProps,
} from '../mainStore/actions/props';
import { convertToGenericElement } from './convertToGenericElement';

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
        slotName: (/** @type{String} */ slotName) =>
            `${ATTR_SLOT_NAME}=${slotName}`,
        useSlot: (/** @type{String} */ slotName) =>
            `${ATTR_SLOT_POSITION}=${slotName}`,
        freezeProp: (/** @type{String} */ prop) => freezePropById({ id, prop }),
        unFreezeProp: (/** @type{String} */ prop) =>
            unFreezePropById({ id, prop }),
        unBind: () => unBind({ id }),
        bindProps: (
            /** @type{{bind:Array<String>,props:() => Object}} */ obj
        ) =>
            ` ${ATTR_DYNAMIC}="${bindProps({ ...obj, ...{ parentId: id } })}" `,
        staticProps: (/** @type{{String: any}} */ obj) =>
            ` ${ATTR_PROPS}="${staticProps(obj)}" `,
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
            bindProps: dynamicProps = undefined, // use alias to maintain ured naming convention.
            beforeUpdate = () => {},
            afterUpdate = () => {},
            key = undefined,
        }) => {
            const currentRepeatId = getUnivoqueId();
            repeatId.push(currentRepeatId);

            addRepeat({
                repeatId: currentRepeatId,
                obj: {
                    state: stateToWatch,
                    watch,
                    targetComponent,
                    props,
                    dynamicProps,
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
