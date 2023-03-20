import {
    addSelfToParentComponent,
    setParentsComponent,
} from '../componentStore/action';
import { registerComponent } from '../componentStore/registerComponent';
import { addOnMoutCallback } from '../mainStore';
import { convertToGenericElement } from './convertToGenericElement';

/**
 * Create component
 */
export const registerGenericElement = ({ component = null, state = {} }) => {
    /**
     * Create basic DOM element
     */
    const { placeholderElement, props, id, componentName } =
        convertToGenericElement({
            component,
        });

    /**
     * Register component to store
     */
    const { getParentId, getState, setState, watch, watchParent, getChildren } =
        registerComponent({
            component,
            placeholderElement,
            props,
            state,
            destroy: () => {},
            id,
            componentName,
        });

    /**
     * Update Parent id before render, do child can use immediatly getParentId.
     */
    setParentsComponent();

    /**
     * Update to parent component child array.
     */
    addSelfToParentComponent({ id });

    return {
        id,
        placeholderElement,
        getParentId,
        getChildren,
        props,
        getState,
        setState,
        watch,
        watchParent,
        render: (content) => {
            return {
                id,
                content,
                placeholderElement,
            };
        },
        onMount: (cb) => addOnMoutCallback({ id, cb }),
    };
};
