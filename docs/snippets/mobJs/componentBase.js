import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponentFn = ({ onMount, getState, setRef, getRef }) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * Function fired at the end of all component parse.
     * Here all components is attached to the DOM (if scoped params is disabled).
     * element: root DOM element.
     * refs: Object with all refs.
     */
    onMount(({ element }) => {
        const { labelRef } = getRef();

        console.log(element); // div.
        console.log(labelRef); // h2.

        /**
         * Destroy function
         */
        return () => {};
    });

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <h2 ${setRef('labelRef')}>${label}</h2>
        </div>
    `;
};
