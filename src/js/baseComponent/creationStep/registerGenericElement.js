import { checkType } from '../../mobbu/store/storeType';
import {
    addSelfToParentComponent,
    setParentsComponent,
    setStateById,
} from '../componentStore/action';
import { registerComponent } from '../componentStore/registerComponent';
import { addOnMoutCallback } from '../mainStore';
import { updateChildren } from '../updateList/updateChildren';
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
    const { getParentId, getState, setState, watch, watchParent, getChildren } =
        registerComponent({
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
        id,
        getParentId,
        getChildren,
        placeholderElement,
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
        updateList: ({
            state = null,
            targetState = '',
            containerList = document.createElement('div'),
            targetComponent = '',
            callback = () => {},
            key = null,
        }) => {
            return watch(state, async (current, previous) => {
                if (!checkType(Array, current)) return;

                await updateChildren({
                    containerList,
                    targetComponent,
                    current,
                    previous,
                    getChildren,
                    key,
                    id,
                });

                getChildren(targetComponent).forEach((id, i) => {
                    //If component is in list
                    if (!current[i]) return;

                    setStateById(
                        id,
                        targetState,
                        callback({
                            current: current[i],
                            previous: previous[i],
                            i,
                        })
                    );
                });
            });
        },
    };
};
