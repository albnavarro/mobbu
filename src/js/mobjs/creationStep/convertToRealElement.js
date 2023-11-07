// @ts-check

import { mobCore } from '../../mobCore';
import { ATTR_IS_COMPONENT, UNSET } from '../constant';
import { getDefaultComponent } from '../createComponent';
import { queryComponentUseSlot } from '../query/queryComponentUseSlot';
import { queryGenericSlot } from '../query/queryGenericSlot';
import { querySecificSlot } from '../query/querySpecificSlot';
import { queryUnNamedSlot } from '../query/queryUnNamedSlot';
import { removeCurrentToDynamicPropsByPropsId } from '../temporaryData/dynamicProps';
import { removeCurrentToPropsByPropsId } from '../temporaryData/staticProps';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.componentParsed
 * @param {String} obj.content
 * @returns {HTMLElement|undefined}
 *
 * @description
 * Get new element from content ( render ).
 * Prevent accidentally return of element or componentParsed deleted runtime.
 * Check parentNode to insertAdjacentHTML possible error.
 */
const getNewElement = ({ componentParsed, content }) => {
    if (componentParsed.parentNode) {
        componentParsed.insertAdjacentHTML('afterend', content);
        return /** @type {HTMLElement} */ (componentParsed.nextElementSibling);
    }

    return;
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @returns void
 *
 * @description
 * Remove unused slot placehodler.
 * ( no element have sustitute slot )
 * If slot is not used remove id reference orphans from store.
 */
const removeOrphanSlot = ({ element }) => {
    const slots = queryGenericSlot(element);

    slots.forEach((slot) => {
        // @ts-ignore
        const dynamicPropsIdFromSlot = slot.getDynamicProps();
        if (dynamicPropsIdFromSlot !== '') {
            removeCurrentToDynamicPropsByPropsId({
                propsId: dynamicPropsIdFromSlot,
            });
        }

        /**
         * If slot is not used remove id reference orphans from store.
         */
        // @ts-ignore
        const staticPropsIdFromSlot = slot.getStaticProps();
        if (staticPropsIdFromSlot !== '') {
            removeCurrentToPropsByPropsId({ propsId: staticPropsIdFromSlot });
        }

        // @ts-ignore
        slot?.removeCustomComponent();
        slot?.remove();
    });
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @returns void
 *
 * @description
 * Move element to related slot if defined.
 * And delete original slot placehodler
 */
const addToSlot = ({ element }) => {
    const componentWithSlot = queryComponentUseSlot(element);
    if (componentWithSlot.length === 0) return;

    const slots = [...componentWithSlot].map((component) => {
        // @ts-ignore
        const slotName = component?.getSlotPosition();

        /**
         * @description
         * Find slot used by component.
         *
         * @type {HTMLElement|null}
         */
        const slot = querySecificSlot(element, slotName);

        /**
         * If no slot return;
         */
        if (!slot) return { slot: null, elementMoved: null };

        /**
         * Add component/element before slot.
         */
        slot.parentNode?.insertBefore(component, slot);
        const elementMoved = /** @type {HTMLElement} */ (slot.previousSibling);

        return { slot, elementMoved };

        /**
         * Delete slot.
         */
    });

    slots.forEach(({ slot, elementMoved }) => {
        if (!slot) return;

        /**
         * @type {String|undefined}
         *
         * @description
         * Set props id from slot to component.
         */
        // @ts-ignore
        const propsIdFromSlot = slot.getStaticProps();
        if (propsIdFromSlot)
            // @ts-ignore
            elementMoved?.setPropsFromSlotId?.(propsIdFromSlot);

        // @ts-ignore
        const bindPropsIdFromSlot = slot.getDynamicProps();
        if (bindPropsIdFromSlot)
            // @ts-ignore
            elementMoved?.setDynamicPropsFromSlotId?.(bindPropsIdFromSlot);

        // @ts-ignore
        slot?.removeCustomComponent();
        slot?.remove();
    });
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.componentParsed
 * @param {String} obj.content
 * @returns {HTMLElement|undefined}
 *
 *
 */
const executeConversion = ({ componentParsed, content }) => {
    /**
     * @type {String}
     *
     * @description
     * Add real content from render function
     */
    const prevContent = componentParsed.innerHTML;
    const newElement = getNewElement({ componentParsed, content });

    /**
     * Get inner content and copy data from provvisory component
     */
    if (newElement) {
        // @ts-ignore
        const id = componentParsed.getId();

        /**
         * @description
         * if unNamedSlot is used.
         * Replace un-named slot with previous content.
         *
         * @type {HTMLElement|null}
         */
        const unNamedSlot = queryUnNamedSlot(newElement);

        if (unNamedSlot) {
            unNamedSlot.insertAdjacentHTML('afterend', prevContent);
            unNamedSlot.remove();
        } else {
            newElement.insertAdjacentHTML('afterbegin', prevContent);
        }

        addToSlot({ element: newElement });
        removeOrphanSlot({ element: newElement });

        /**
         * Add data-mobjs="id" in debug mode.
         */
        const { debug } = getDefaultComponent();
        if (debug) newElement.setAttribute(ATTR_IS_COMPONENT, id ?? '');
    }

    /**
     * Delete provvisory component and add real component.
     */
    componentParsed.remove();

    return newElement;
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.componentParsed
 * @param {String} obj.content
 * @param {Boolean|'UNSET'} obj.isolateCreation
 * @returns { Promise<{newElement:( HTMLElement|undefined ) }> | {newElement:( HTMLElement|undefined ) } }
 *
 * @description
 * Add content to component

 *
 */
export const convertToRealElement = ({
    componentParsed,
    content,
    isolateCreation,
}) => {
    const isolateCreationParsed =
        isolateCreation === UNSET
            ? getDefaultComponent().isolateCreation
            : isolateCreation;

    return isolateCreationParsed
        ? new Promise((resolve) => {
              mobCore.useFrame(() => {
                  const newElement = executeConversion({
                      componentParsed,
                      content,
                  });

                  mobCore.useNextTick(() => {
                      resolve({ newElement });
                  });
              });
          })
        : new Promise((resolve) => {
              const newElement = executeConversion({
                  componentParsed,
                  content,
              });

              resolve({ newElement });
          });
};
