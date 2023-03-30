import {
    addSelfToParentComponent,
    setParentsComponent,
} from '../componentStore/action';
import { registerComponent } from '../componentStore/registerComponent';
import { addOnMoutCallback } from '../mainStore/actions/onMount';
import { watchList } from '../updateList/watchList';
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
        render: (content) => {
            return {
                id,
                content,
                placeholderElement,
            };
        },
        onMount: (cb) => addOnMoutCallback({ id, cb }),
        updateList: ({
            watch: state = null,
            targetState = '',
            container: containerList = document.createElement('div'),
            component: targetComponent = '',
            updateState = () => {},
            key = null,
        }) => {
            return watchList({
                state,
                targetState,
                watch,
                containerList,
                targetComponent,
                updateState,
                getChildren,
                key,
                id,
            });
        },
    };
};
