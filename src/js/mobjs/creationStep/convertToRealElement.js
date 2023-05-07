import {
    IS_COMPONENT,
    PROPS_FROM_SLOT,
    SLOT_NAME,
    SLOT_POSITION,
} from '../constant';

/**
 * Get new element from content ( render ).
 * Prevent accidentally return of element or placeholderElement deleted runtime.
 * Check parentNode to insertAdjacentHTML possible error.
 */
const getNewElement = ({ placeholderElement, content }) => {
    if (placeholderElement.parentNode) {
        placeholderElement.insertAdjacentHTML('afterend', content);
        return placeholderElement.nextElementSibling;
    }

    return null;
};

/**
 * Remove unused slot placehodler.
 * ( no element have sustitute slot )
 */
const removeOrphanSlot = ({ element }) => {
    const slots = element.querySelectorAll('slot');
    slots.forEach((element) => element.remove());
};

/**
 * Move element to related slot if defined.
 * And delete original slot placehodler
 */
const addToSlot = ({ element }) => {
    const componentWithSlot = element.querySelectorAll(`[${SLOT_POSITION}]`);
    componentWithSlot.forEach((component) => {
        const slotTargetName = component.dataset?.slotposition;
        const slot = element.querySelector(
            `slot[${SLOT_NAME}="${slotTargetName}"]`
        );
        if (!slot) return;

        /**
         * Add component/element before slot.
         */
        slot.parentNode.insertBefore(component, slot);
        const elementMoved = slot.previousSibling;
        elementMoved.removeAttribute(SLOT_POSITION);

        /**
         * Set props id from slot to component.
         */
        const propsIdFromSlot = slot.dataset.props;
        elementMoved.dataset[PROPS_FROM_SLOT] = propsIdFromSlot;

        /**
         * Delete slot.
         */
        slot.remove();
    });
};

/**
 * Add content to component
 *
 * Use async logic only for security or debug
 * With a setTimeout it is possible dibug the sequence of cration more easly
 *
 * It is possible use parseComponents() to launch the parse of
 * custom DOM added to the component immadatly
 */
export const convertToRealElement = ({ placeholderElement, content }) => {
    return new Promise((resolve) => {
        /**
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
            newElement.setAttribute(IS_COMPONENT, '');
        }

        /**
         * Delete provvisory component and add real component.
         */
        placeholderElement.remove();
        resolve({ newElement });
    });
};
