// @ts-check

import { defineRepeatComponent } from '../webComponent/repeat';
import { defineInvalidateComponent } from '../webComponent/invalidate';
import { defineSlotComponent } from '../webComponent/slot';
import { defineUserComponent } from '../webComponent/user-component';
import { defineBindTextComponent } from '../webComponent/bind-text';
import { defineBindObjectComponent } from '../webComponent/bind-object';

/**
 * @type {{[key:string]:import('../mainStore/type').ComponentListMap}}
 */
let componentListMap = {};

/**
 * @description
 *
 * @returns {{[key:string]:import('../mainStore/type').ComponentListMap}}
 */
export const getComponentList = () => {
    return componentListMap;
};

/**
 * @type {Set<import('../type').CreateComponentReturnType>}
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

    console.log(`component loaded:${Object.keys(componentListMap).length}`);

    /**
     * Register custom HTML tag component.
     * Thios custom TAG will be converted in native DOM element during parse.
     */

    defineUserComponent(componentListMap);
    defineSlotComponent();
    defineInvalidateComponent();
    defineRepeatComponent();
    defineBindTextComponent();
    defineBindObjectComponent();
};

/**
 * @param {import('../type').CreateComponentReturnType[]} components
 * @returns {void}
 */
export const useComponent = (components) => {
    if (!components || components?.length === 0) return;

    components.forEach((component) => {
        availableComponent.add(component);
    });
};
