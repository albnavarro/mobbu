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
        // setTimeout(() => {
        /**
         * Add real content from render function
         */
        placeholderElement.insertAdjacentHTML('afterbegin', content);

        /**
         * Get inner content and copy data from provvisory component
         */
        const firstChild = placeholderElement.firstElementChild;
        firstChild.id = placeholderElement.id;
        firstChild.setAttribute('data-iscomponent', '');

        /**
         * Delete provvisory component and add real component.
         */
        placeholderElement.replaceWith(...placeholderElement.childNodes);
        resolve({ newElement: firstChild });
        // }, 500);
    });
};
