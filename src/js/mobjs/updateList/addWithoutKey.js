// @ts-check

import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { createDynamicProps, createProps } from '../mainStore/actions/props';
import { IS_RUNTIME } from '../constant';
import { getChildrenInsideElement } from './utils';

/**
 * @param {Object} obj
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {HTMLElement} obj.containerList
 * @param {string} obj.targetComponent
 * @param {function} obj.getChildren
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
 * @param {string} obj.runtimeId
 * @return {Array}
 *
 * @description
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithoutKey = ({
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = '',
    getChildren = () => {},
    runtimeId = '',
    props = {},
    dynamicProps = {},
}) => {
    /**
     * @type {number}
     */
    const currentLenght = current.length;

    /**
     * @type {number}
     */
    const previousLenght = previous.length;

    /**
     * @type {number}
     */
    const diff = currentLenght - previousLenght;

    /**
     * Add
     */
    if (diff > 0) {
        /**
         * Create palcehodler component
         */
        const elementToAdd = [...Array(diff).keys()]
            .map((_item, index) => {
                const currentProps = createProps(
                    props({
                        current: current?.[index + previousLenght],
                        index: index + previousLenght,
                    })
                );

                const currentDynamicProps = createDynamicProps(dynamicProps);

                return /* HTML */ `
                    <component
                        data-props=${currentProps}
                        data-dynamicprops=${currentDynamicProps}
                        ${IS_RUNTIME}="${runtimeId}"
                        data-component="${targetComponent}"
                    >
                    </component>
                `;
            })
            .reverse();

        /**
         * Filter children inside containerList
         */
        const childrenFilteredToAdd = getChildrenInsideElement({
            component: targetComponent,
            getChildren,
            element: containerList,
        });

        const lastChildren =
            childrenFilteredToAdd[childrenFilteredToAdd.length - 1];

        /**
         * Query last child and append new children.
         * TODO Usare un metodo dello sotre per prender il DOM element dall' id ?
         */
        elementToAdd.forEach((element) => {
            const lastNode = containerList.querySelector(`#${lastChildren}`);

            if (lastNode) {
                lastNode.insertAdjacentHTML('afterend', element);
                return;
            }

            containerList.insertAdjacentHTML('afterbegin', element);
        });
    }

    /**
     * Remove
     */

    /**
     * Filter children inside containerList
     */
    const childrenFilteredToRemove = getChildrenInsideElement({
        component: targetComponent,
        getChildren,
        element: containerList,
    });

    const childrenToRemoveByKey = childrenFilteredToRemove.filter(
        (_child, i) => {
            return i >= current.length;
        }
    );

    childrenToRemoveByKey.forEach((childId) => {
        removeAndDestroyById({ id: childId });
    });

    return current;
};
