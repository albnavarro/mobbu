import { defineRepeatComponent } from '../web-component/repeat';
import { defineInvalidateComponent } from '../web-component/invalidate';
import { defineSlotComponent } from '../web-component/slot';
import { defineUserComponent } from '../web-component/user-component';
import { defineBindTextComponent } from '../web-component/bind-text';
import { defineBindObjectComponent } from '../web-component/bind-object';

/**
 * Available component:
 *
 * - Key is the tag of component.
 * - Value is the specs.
 *
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
 * Inizalize components from availableComponent data Set.
 *
 * @returns {void}
 */
export const setComponentList = () => {
    componentListMap = Object.fromEntries(
        [...availableComponent.values()].flatMap((item) => Object.entries(item))
    );

    console.log(`component loaded:${Object.keys(componentListMap).length}`);

    /**
     * Register custom HTML tag component. This custom TAG will be converted in native DOM element during parse.
     */

    defineUserComponent(componentListMap);
    defineSlotComponent();
    defineInvalidateComponent();
    defineRepeatComponent();
    defineBindTextComponent();
    defineBindObjectComponent();
};

/**
 * - Single page call useComponent first, so load first level component used in page.
 * - Single component load from page use useComponent for child component inside createComponent() function.
 * - At the end all component is loaded correctly.
 *
 * @param {import('../type').CreateComponentReturnType[]} components
 * @returns {void}
 */
export const useComponent = (components) => {
    if (!components || components?.length === 0) return;

    components.forEach((component) => {
        availableComponent.add(component);
    });
};
