// @ts-check

import { mainStore } from '../mainStore';

/**
 * @description
 *
 * @returns void
 */
export const setComponentList = (list = {}) => {
    const listParsed = Object.values(list).reduce(
        (previous, current) => ({ ...previous, ...current }),
        {}
    );

    mainStore.set('componentList', listParsed);

    Object.entries(listParsed).forEach(([key, value]) => {
        const {
            componentParams: { type, DOMprimitive },
        } = value;

        customElements.define(
            key,
            class extends DOMprimitive {
                constructor() {
                    super(); /* ... */
                }
            },
            {
                extends: type,
            }
        );
    });
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
