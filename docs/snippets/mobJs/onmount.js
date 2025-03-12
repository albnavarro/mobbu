/**
onMount(
    arg0: (arg1: {
        element: HTMLElement;
        refs: { [key: string]: HTMLElement | HTMLElement[] };
    }) => () => void
): void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, setRef, getRef }) => {
    onMount(({ element }) => {
        const { labelRef } = getRef();

        console.log(element); // div.
        console.log(labelRef); // h2.

        /**
         * Destroy function
         * Optional
         */
        return () => {};
    });

    /**
     * Return the DOM.
     */
    return html`
        <div>
            <h2 ${setRef('labelRef')}>Title</h2>
        </div>
    `;
};
