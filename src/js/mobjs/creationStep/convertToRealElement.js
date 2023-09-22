// @ts-check

import { mobCore } from '../../mobCore';
import {
    ATTR_DYNAMIC_PARTIAL,
    ATTR_IS_COMPONENT,
    ATTR_PROPS_PARTIAL,
    ATTR_SLOT_NAME,
    ATTR_SLOT_POSITION,
    UNSET,
    ATTR_PLACEHOLDER_PARTIAL,
} from '../constant';
import { getDefaultComponent } from '../createComponent';
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
 */
const removeOrphanSlot = ({ element }) => {
    const slots = element.querySelectorAll('slot');
    slots.forEach((slot) => {
        /**
         * If slot is not used remove id reference orphans from store.
         */
        const dynamicPropsIdFromSlot = slot.dataset?.[ATTR_DYNAMIC_PARTIAL];
        if (dynamicPropsIdFromSlot) {
            removeCurrentToDynamicPropsByPropsId({
                propsId: dynamicPropsIdFromSlot,
            });
        }

        /**
         * If slot is not used remove id reference orphans from store.
         */
        const propsIdFromSlot = slot.dataset?.[ATTR_PROPS_PARTIAL];
        if (propsIdFromSlot) {
            removeCurrentToPropsByPropsId({ propsId: propsIdFromSlot });
        }

        slot.remove();
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
    const componentWithSlot = /** @type {NodeListOf.<HTMLElement>} */ (
        element.querySelectorAll(`[${ATTR_SLOT_POSITION}]`)
    );

    [...componentWithSlot].forEach((component) => {
        const slotTargetName = component.dataset?.slotposition;

        /**
         * @type {HTMLElement|null}
         */
        const slot = element.querySelector(
            `slot[${ATTR_SLOT_NAME}="${slotTargetName}"]`
        );
        if (!slot) return;

        /**
         * Add component/element before slot.
         */
        slot.parentNode?.insertBefore(component, slot);
        const elementMoved = /** @type {HTMLElement} */ (slot.previousSibling);

        if (elementMoved) {
            elementMoved.removeAttribute(ATTR_SLOT_POSITION);
        }

        /**
         * @type {String|undefined}
         *
         * @description
         * Set props id from slot to component.
         */
        const propsIdFromSlot = slot.dataset?.[ATTR_PROPS_PARTIAL];
        if (propsIdFromSlot)
            // @ts-ignore
            elementMoved.setPropsFromSlotId(propsIdFromSlot);

        const bindPropsIdFromSlot = slot.dataset?.[ATTR_DYNAMIC_PARTIAL];
        if (bindPropsIdFromSlot)
            // @ts-ignore
            elementMoved.setDynamicPropsFromSlotId(bindPropsIdFromSlot);

        /**
         * Delete slot.
         */
        slot.remove();
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
        const id = componentParsed.dataset[ATTR_PLACEHOLDER_PARTIAL];
        newElement.insertAdjacentHTML('afterbegin', prevContent);
        addToSlot({ element: newElement });
        removeOrphanSlot({ element: newElement });
        newElement.setAttribute(ATTR_IS_COMPONENT, id ?? '');
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
