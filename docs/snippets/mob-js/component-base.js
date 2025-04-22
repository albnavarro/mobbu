import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponentFn = ({ onMount, getState, setRef, getRef }) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * Function fired at the end of all component parse.
     * Here all components is attached to the DOM ( if scoped params
     * is disabled ). Element: root DOM element.
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
