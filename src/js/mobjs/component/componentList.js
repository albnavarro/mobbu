// @ts-check

import { defineRepeatComponent } from '../webComponent/repeat';
import { defineInvalidateComponent } from '../webComponent/invalidate';
import { defineSlotComponent } from '../webComponent/slot';
import { defineUserComponent } from '../webComponent/userComponent';
import { defineBindTextComponent } from '../webComponent/bindText';
import { defineBindObjectComponent } from '../webComponent/bindObject';

/**
 * @type {{[key:string]:import('../mainStore/type').ComponentListMapType}}
 */
export let componentListMap = {};

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
    components.forEach((component) => {
        availableComponent.add(component);
    });
};
