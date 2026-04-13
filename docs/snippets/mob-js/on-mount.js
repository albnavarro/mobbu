import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, setRef, getRef }) => {
    onMount(({ element }) => {
        const { labelRef } = getRef();

        console.log(element); // div.
        console.log(labelRef); // h2.

        /**
         * Destroy function Optional
         */
        return () => {};
    });

    /**
     * Return the DOM.
     */
    return htmlObject({
        className: 'my-class',
        content: {
            tag: 'h2',
            modules: setRef('labelRef'),
        },
    });
};
