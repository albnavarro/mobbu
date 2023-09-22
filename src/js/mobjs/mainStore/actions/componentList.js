// @ts-check

import { defineRepeaterComponent } from '../../webComponent/repeater';
import { defineUserComponent } from '../../webComponent/userComponent';
import { mainStore } from '../mainStore';

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

    mainStore.set('componentList', componentList);

    /**
     * Register custom HTML tag component.
     * Thios custom TAG will be converted in native DOM element during parse.
     */

    defineUserComponent(componentList);
    defineRepeaterComponent();
};

/**
 * @description
 *
 * @returns {Object} Object with all component definition.
 */
export const getComponentList = () => {
    const { componentList } = mainStore.get();
    return componentList;
};
