// @ts-check

import { core } from '../../mobbu';
import {
    ATTR_DYNAMIC_PARTIAL,
    ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL,
    ATTR_IS_COMPONENT,
    ATTR_PROPS_PARTIAL,
    ATTR_PROPS_FROM_SLOT_PARTIAL,
    ATTR_SLOT_NAME,
    ATTR_SLOT_POSITION,
} from '../constant';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.placeholderElement
 * @param {String} obj.content
 * @returns {HTMLElement|undefined}
 *
 * @description
 * Get new element from content ( render ).
 * Prevent accidentally return of element or placeholderElement deleted runtime.
 * Check parentNode to insertAdjacentHTML possible error.
 */
const getNewElement = ({ placeholderElement, content }) => {
    if (placeholderElement.parentNode) {
        placeholderElement.insertAdjacentHTML('afterend', content);
        return /** @type {HTMLElement} */ (
            placeholderElement.nextElementSibling
        );
    }

    return undefined;
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
    slots.forEach((element) => element.remove());
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
            elementMoved.dataset[ATTR_PROPS_FROM_SLOT_PARTIAL] =
                propsIdFromSlot;

        const bindPropsIdFromSlot = slot.dataset?.[ATTR_DYNAMIC_PARTIAL];
        if (bindPropsIdFromSlot)
            elementMoved.dataset[ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL] =
                bindPropsIdFromSlot;

        /**
         * Delete slot.
         */
        slot.remove();
    });
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.placeholderElement
 * @param {String} obj.content
 * @returns { Promise<{newElement:( HTMLElement|undefined )}> }
 *
 * @description
 * Add content to component
 *
 */
export const convertToRealElement = ({ placeholderElement, content }) => {
    return new Promise((resolve) => {
        core.useFrame(() => {
            /**
             * @type {String}
             *
             * @description
             * Add real content from render function
             */
            const prevContent = placeholderElement.innerHTML;
            const newElement = getNewElement({ placeholderElement, content });

            /**
             * Get inner content and copy data from provvisory component
             */
            if (newElement) {
                const id = placeholderElement.id;
                newElement.insertAdjacentHTML('afterbegin', prevContent);
                addToSlot({ element: newElement });
                removeOrphanSlot({ element: newElement });
                newElement.id = id;
                newElement.setAttribute(ATTR_IS_COMPONENT, '');
            }

            /**
             * Delete provvisory component and add real component.
             */
            placeholderElement.remove();

            core.useNextTick(() => {
                resolve({ newElement });
            });
        });
    });
};
