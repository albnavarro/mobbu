// @ts-check

import { defineRepeatComponent } from '../web-component/repeat';
import { defineInvalidateComponent } from '../web-component/invalidate';
import { defineSlotComponent } from '../web-component/slot';
import { defineUserComponent } from '../web-component/user-component';
import { defineBindTextComponent } from '../web-component/bind-text';
import { defineBindObjectComponent } from '../web-component/bind-object';

/**
 * @type {{ [key: string]: import('../main-store/type').ComponentListMap }}
 */
let componentListMap = {};

/**
 * @returns {{ [key: string]: import('../main-store/type').ComponentListMap }}
 */
export const getComponentList = () => {
    return componentListMap;
};

/**
 * @type {Set<import('../type').CreateComponentReturnType>}
 */
const availableComponent = new Set();

/**
 * Inizalize components
 *
 * @returns {void}
 */
export const setComponentList = () => {
    componentListMap = [...availableComponent.values()].reduce(
        (previous, current) => ({ ...previous, ...current }),
        {}
    );

    console.log(`component loaded:${Object.keys(componentListMap).length}`);

    /**
     * Register custom HTML tag component. Thios custom TAG will be converted in native DOM element during parse.
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
