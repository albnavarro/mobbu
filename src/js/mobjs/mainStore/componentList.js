// @ts-check

import { defineRepeaterComponent } from '../webComponent/repeater';
import { defineSlotComponent } from '../webComponent/slot';
import { defineUserComponent } from '../webComponent/userComponent';

/**
 * @type {{[key:string]:import('./type').componentListMapType}}
 */
let componentListMap = {};

/**
 * @type {Set<import('../type').createComponentReturnType>}
 */
const availableComponent = new Set();

/**
 * @description
 * Inizalize components
 *
 * @returns void
 */
export const setComponentList = () => {
    componentListMap = [...availableComponent.values()].reduce(
        (previous, current) => ({ ...previous, ...current }),
        {}
    );

    console.log(componentListMap);
    console.log(Object.keys(componentListMap).length);

    /**
     * Register custom HTML tag component.
     * Thios custom TAG will be converted in native DOM element during parse.
     */

    defineUserComponent(componentListMap);
    defineRepeaterComponent();
    defineSlotComponent();
};

/**
 * @description
 *
 * @returns {{[key:string]:import('./type').componentListMapType}}
 */
export const getComponentList = () => {
    return componentListMap;
};

/**
 * @param {import('../type').createComponentReturnType[]} components
 */
export const useComponent = (components) => {
    console.log(components);
    components.forEach((component) => {
        availableComponent.add(component);
    });
};
