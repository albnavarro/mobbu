// @ts-check

import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { setBindProps } from '../mainStore/actions/props';
import {
    ATTR_BIND_EVENTS,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_DYNAMIC,
    ATTR_IS_COMPONENT,
    ATTR_IS_RUNTIME,
    ATTR_PROPS,
} from '../constant';
import { getChildrenInsideElement } from './utils';
import { getElementById } from '../componentStore/action/element';
import { setBindEvents } from '../temporaryData/bindEvents';
import { setCurrentValueList } from '../temporaryData/currentRepeaterItemValue';
import { setStaticProps } from '../temporaryData/staticProps';

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
                    <${targetComponent}
                        ${ATTR_PROPS}=${currentProps}
                        ${currentDynamicProps}
                        ${currentBindEvents}
                        ${ATTR_IS_RUNTIME}="${runtimeId}"
                        ${ATTR_CURRENT_LIST_VALUE}="${setCurrentValueList({
                    current: currentValue,
                    index: currentIndex,
                })}"
                    >
                    </${targetComponent}>
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
            const lastNode = containerList.querySelector(
                `[${ATTR_IS_COMPONENT}='${lastChildren}']`
            );

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

    if (diff < 0) {
        /**
         * Filter children inside containerList
         */
        const childrenFilteredToRemove = getChildrenInsideElement({
            component: targetComponent,
            getChildren,
            element: containerList,
        });

        /**
         * element to remove
         */
        const childrenToRemoveByKey = childrenFilteredToRemove.filter(
            (_child, i) => {
                return i >= current.length;
            }
        );

        /**
         * Persistent element
         */
        const childrenPersistent = childrenFilteredToRemove.filter(
            (_child, i) => {
                return i < current.length;
            }
        );

        /**
         * Remove all dom component
         * Web Component trick p1.
         * Sure to remove host element.
         */
        containerList.textContent = '';

        /**
         * Destroy
         */
        childrenToRemoveByKey.forEach((childId) => {
            removeAndDestroyById({ id: childId });
        });

        /**
         * Re-add persistent element
         * Web component trick p2.
         */
        childrenPersistent.forEach((childId) => {
            const element = getElementById({ id: childId });
            if (element) containerList.append(element);
        });
    }

    return current;
};
