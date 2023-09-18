// @ts-check

import { ATTR_IS_COMPONENT, ATTR_IS_COMPONENT_VALUE } from '../../constant';
import { storeAction } from '../../createComponent';
import { componentMap, componentStore } from '../store';
import { getComponentNameById } from './component';
import { getElementById } from './element';

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.component
 * @returns {Array.<String>}
 *
 * @description
 * Get children id.
 */
export const getChildrenIdByName = ({ id = '', component = '' }) => {
    if (!id || id === '') return [];

    // const { instances } = componentStore.get();
    //
    // /**
    //  * @type {import('../store.js').componentStoreType}
    //  */
    // const instance = instances.find(({ id: currentId }) => {
    //     return currentId === id;
    // });
    //
    // const child = instance?.child;
    // if (!child) {
    //     console.warn(`getChildIdById failed no id found`);
    //     return [];
    // }

    const { child } = componentMap.get(id);
    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return child?.[component] ?? [];
};

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.component
 * @return void
 *
 *
 * @description
 * Update children order of a component
 */
export const updateChildrenOrder = ({ id, component }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });
    if (!element) return;

    /**
     * Get id af all component inside
     */
    const components = element.querySelectorAll(`[${ATTR_IS_COMPONENT}]`);
    const componentsIdNow = [...components].map(
        (item) => item?.dataset[ATTR_IS_COMPONENT_VALUE]
    );

    /**
     * Filter for the component we are looking for
     */
    const componentsIdFiltered = componentsIdNow.filter((currentId) => {
        return getComponentNameById(currentId) === component;
    });

    /**
     * Update children store od element with the DOM actual order.
     */
    componentStore[storeAction](
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId, child } = item;

                return currentId === id
                    ? {
                          ...item,
                          child: {
                              ...child,
                              [component]: componentsIdFiltered,
                          },
                      }
                    : item;
            });
        }
    );

    // - new
    /*
     * Get element
     */
    const element2 = getElementById({ id });
    if (!element2) return;

    /**
     * Get id af all component inside
     */
    const components2 = element.querySelectorAll(`[${ATTR_IS_COMPONENT}]`);
    const componentsIdNow2 = [...components2].map(
        (item) => item?.dataset[ATTR_IS_COMPONENT_VALUE]
    );

    /**
     * Filter for the component we are looking for
     */
    const componentsIdFiltered2 = componentsIdNow2.filter((currentId) => {
        return getComponentNameById(currentId) === component;
    });

    const item = componentMap.get(id);
    const { child } = item;
    componentMap.set(id, {
        ...item,
        child: {
            ...child,
            [component]: componentsIdFiltered2,
        },
    });
};
