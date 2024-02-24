// @ts-check

import { defineRepeaterComponent } from '../webComponent/repeater';
import { defineSlotComponent } from '../webComponent/slot';
import { defineUserComponent } from '../webComponent/userComponent';

/**
 * @type {{[key:string]:{componentFunction:function,componentParams:Object}}}
 */
let componentListMap = {};

/**
 * @description
 *
 * @returns void
 */
export const setComponentList = (list = {}) => {
    const componentList = Object.values(list).reduce(
        (previous, current) => ({ ...previous, ...current }),
        {}
    );

    componentListMap = componentList;

    /**
     * Register custom HTML tag component.
     * Thios custom TAG will be converted in native DOM element during parse.
     */

    defineUserComponent(componentList);
    defineRepeaterComponent();
    defineSlotComponent();
};

/**
 * @description
 *
 * @returns {Object} Object with all component definition.
 */
export const getComponentList = () => {
    return componentListMap;
};
