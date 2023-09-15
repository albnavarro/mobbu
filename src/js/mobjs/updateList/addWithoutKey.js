// @ts-check

import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { setBindProps, setStaticProps } from '../mainStore/actions/props';
import {
    ATTR_BIND_EVENTS,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_IS_RUNTIME,
    ATTR_PROPS,
    ATTR_WILL_COMPONENT,
} from '../constant';
import { getChildrenInsideElement } from './utils';
import { setCurrentValueList } from '../mainStore/actions/currentListValue';
import { setBindEvents } from '../mainStore/actions/bindEvents';

/**
 * @param {Object} obj
 * @param {Array} obj.current
 * @param {Array} obj.previous
 * @param {HTMLElement} obj.containerList
 * @param {string} obj.targetComponent
 * @param {function} obj.getChildren
 * @param {object} obj.props
 * @param {object} obj.dynamicProps
 * @param {Array|object} obj.bindEvents
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
    dynamicProps,
    bindEvents,
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
        const elementToAdd = [...new Array(diff).keys()]
            .map((_item, index) => {
                const currentValue = current?.[index + previousLenght];
                const currentIndex = index + previousLenght;

                const currentProps = setStaticProps(
                    props({
                        current: currentValue,
                        index: currentIndex,
                    })
                );

                const currentDynamicProps = dynamicProps
                    ? `${ATTR_DYNAMIC}=${setBindProps(dynamicProps)}`
                    : '';

                /**
                 * Gat and save bindEvents.
                 */
                const currentBindEvents = dynamicProps
                    ? `${ATTR_BIND_EVENTS}=${setBindEvents(bindEvents)}`
                    : '';

                return /* HTML */ `
                    <c-mobjs
                        ${ATTR_PROPS}=${currentProps}
                        ${currentDynamicProps}
                        ${currentBindEvents}
                        ${ATTR_IS_RUNTIME}="${runtimeId}"
                        ${ATTR_WILL_COMPONENT}="${targetComponent}"
                        ${ATTR_CURRENT_LIST_VALUE}="${setCurrentValueList({
                            current: currentValue,
                            index: currentIndex,
                        })}"
                    >
                    </c-mobjs>
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

        const lastChildren = childrenFilteredToAdd.at(-1);

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
