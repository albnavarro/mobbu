import { setParentsComponent } from '../componentStore/action';
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
    const { element, props, id } = convertToGenericElement({
        component,
    });

    /**
     * Register component to store
     */
    const { getParentId, getState, setState, watch, watchParent } =
        registerComponent({
            component,
            element,
            props,
            state,
            destroy: () => {},
            id,
        });

    // Update Parent id before render, do child can use immediatly getParentId
    setParentsComponent();

    return {
        id,
        element,
        getParentId,
        props,
        getState,
        setState,
        watch,
        watchParent,
        render: (content) => {
            return {
                id,
                content,
                element,
            };
        },
        onMount: (cb) => addOnMoutCallback({ id, cb }),
    };
};
