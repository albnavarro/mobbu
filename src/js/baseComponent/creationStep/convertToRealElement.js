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

const addPreviousContent = ({ element, content }) => {
    const slot = element.querySelector('slot');

    if (slot) {
        slot.insertAdjacentHTML('afterend', content);
        slot.remove();
        return;
    }

    element.insertAdjacentHTML('afterbegin', content);
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
            addPreviousContent({ element: newElement, content: prevContent });
            newElement.id = placeholderElement.id;
            newElement.setAttribute('data-iscomponent', '');
        }

        /**
         * Delete provvisory component and add real component.
         */
        placeholderElement.remove();
        resolve({ newElement });
    });
};
