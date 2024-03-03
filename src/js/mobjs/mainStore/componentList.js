// @ts-check

import { defineRepeaterComponent } from '../webComponent/repeater';
import { defineSlotComponent } from '../webComponent/slot';
import { defineUserComponent } from '../webComponent/userComponent';

/**
 * @type {{[key:string]:{componentFunction:(arg0: import('../type').componentType) => Promise<import('../type').componentReturnType>,componentParams:import('../type').componentParsedType }}}
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
 * @returns {{[key:string]:{componentFunction:(arg0: import('../type').componentType) => Promise<import('../type').componentReturnType>,componentParams:import('../type').componentParsedType }}}
 */
export const getComponentList = () => {
    return componentListMap;
};
