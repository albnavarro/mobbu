import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getChildrenIdByName } from '../componentStore/action/children';
import {
    addSelfToParentComponent,
    getParentIdById,
    setParentsComponent,
} from '../componentStore/action/parent';
import { watchById } from '../componentStore/action/watch';
import { registerComponent } from '../componentStore/registerComponent';
import { addOnMoutCallback } from '../mainStore/actions/onMount';
import { addRepeat } from '../mainStore/actions/repeat';
import { convertToGenericElement } from './convertToGenericElement';

/**
 * Create component
 */
export const registerGenericElement = ({
    component = null,
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
        key,
    } = convertToGenericElement({
        component,
        defaultProps: props,
    });

    /**
     * Register component to store
     */
    const { getState, setState, emit, computed, watch } = registerComponent({
        component,
        placeholderElement,
        props: propsUpdated,
        state,
        destroy: () => {},
        id,
        componentName,
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
    const getChildren = (component) => getChildrenIdByName({ id, component });

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
        watchParent: (prop, cb) => watchById(getParentIdById(id), prop, cb),
        render: (content) => {
            return {
                id,
                content,
                placeholderElement,
            };
        },
        onMount: (cb) => addOnMoutCallback({ id, cb }),
        repeat: ({
            watch: state = null,
            component: targetComponent = '',
            props = () => {},
            updateState = () => {},
            beforeUpdate = () => {},
            afterUpdate = () => {},
            key = null,
        }) => {
            const currentRepeatId = getUnivoqueId();
            repeatId.push(currentRepeatId);

            addRepeat({
                repeatId: currentRepeatId,
                obj: {
                    state,
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
