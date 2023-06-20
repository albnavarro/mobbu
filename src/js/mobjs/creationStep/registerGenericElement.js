// @ts-check

import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getChildrenIdByName } from '../componentStore/action/children';
import {
    addSelfToParentComponent,
    getParentIdById,
    setParentsComponent,
} from '../componentStore/action/parent';
import { watchById } from '../componentStore/action/watch';
import { addComponentToStore } from '../componentStore/registerComponent';
import { addOnMoutCallback } from '../mainStore/actions/onMount';
import { addRepeat } from '../mainStore/actions/repeat';
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
export const registerGenericElement = ({
    component,
    state = {},
    props = {},
}) => {
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
    } = convertToGenericElement({
        component,
        defaultProps: props,
    });

    /**
     * Register component to store
     */
    const { getState, setState, emit, computed, watch } = addComponentToStore({
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
    setParentsComponent();

    /**
     * Update to parent component child array.
     */
    addSelfToParentComponent({ id });

    const repeatId = [];
    const getChildren = (/** @type {String} */ component) =>
        getChildrenIdByName({ id, component });

    return {
        key,
        id,
        placeholderElement,
        props: propsUpdated,
        getState,
        setState,
        emit,
        computed,
        watch,
        repeatId,
        getChildren,
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
            updateState = () => {},
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
                    updateState,
                    beforeUpdate,
                    afterUpdate,
                    getChildren,
                    key,
                    id,
                },
            });

            return `<span data-repeatid="${currentRepeatId}" style="display:none;"/>`;
        },
    };
};
