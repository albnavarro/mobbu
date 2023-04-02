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
         * Check if placeholder is already live.
         */
        // const elementExist = document.body.contains(placeholderElement);
        // if (!elementExist) {
        //     resolve({ newElement: null });
        //     return;
        // }

        /**
         * Add real content from render function
         */
        const prevContent = placeholderElement.innerHTML;
        placeholderElement.insertAdjacentHTML('afterend', content);

        let newElement = placeholderElement.nextElementSibling;
        newElement.insertAdjacentHTML('afterbegin', prevContent);

        /**
         * Get inner content and copy data from provvisory component
         */
        // const firstChild = placeholderElement.firstElementChild;
        newElement.id = placeholderElement.id;
        newElement.setAttribute('data-iscomponent', '');

        /**
         * Delete provvisory component and add real component.
         */
        placeholderElement.remove();
        resolve({ newElement });
    });
};
