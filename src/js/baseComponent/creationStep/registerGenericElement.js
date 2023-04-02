import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import {
    addSelfToParentComponent,
    setParentsComponent,
} from '../componentStore/action';
import { registerComponent } from '../componentStore/registerComponent';
import { addOnMoutCallback } from '../mainStore/actions/onMount';
import { addRepeat } from '../mainStore/actions/repeat';
import { convertToGenericElement } from './convertToGenericElement';

/**
 * Create component
 */
export const registerGenericElement = ({ component = null, state = {} }) => {
    /**
     * Create basic DOM element
     */
    const { placeholderElement, props, id, componentName, key } =
        convertToGenericElement({
            component,
        });

    /**
     * Register component to store
     */
    const {
        getParentId,
        getState,
        setState,
        emit,
        computed,
        watch,
        watchParent,
        getChildren,
    } = registerComponent({
        component,
        placeholderElement,
        props,
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

    return {
        key,
        id,
        getParentId,
        getChildren,
        placeholderElement,
        props,
        getState,
        setState,
        emit,
        computed,
        watch,
        watchParent,
        repeatId,
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
            onComplete = () => {},
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
                    onComplete,
                    getChildren,
                    key,
                    id,
                },
            });

            return `<span data-repeatid="${currentRepeatId}" style="display:none;"/>`;
        },
    };
};
