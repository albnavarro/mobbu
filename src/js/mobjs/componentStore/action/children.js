// @ts-check

import { IS_COMPONENT } from '../../constant';
import { componentStore } from '../store';
import { getComponentNameById } from './component';
import { getElementById } from './element';

/**
 * Get children id.
 */
export const getChildrenIdByName = ({ id, component }) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    const child = instance?.child;
    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return null;
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
    const components = element.querySelectorAll(`[${IS_COMPONENT}]`);
    const componentsIdNow = [...components].map((item) => item.id);

    /**
     * Filter for the component we are looking for
     */
    const componentsIdFiltered = componentsIdNow.filter((currentId) => {
        return getComponentNameById(currentId) === component;
    });

    /**
     * Update children store od element with the DOM actual order.
     */
    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId } = item;

                return currentId === id
                    ? {
                          ...item,
                          ...{
                              child: {
                                  ...item.child,
                                  ...{ [component]: componentsIdFiltered },
                              },
                          },
                      }
                    : item;
            });
        }
    );
};
