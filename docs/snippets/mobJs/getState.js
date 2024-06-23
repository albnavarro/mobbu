getState(arg0: string): any;

/**
 * @type {import("../mobjs/type").mobComponent<'label'>}
 */
export const MyComponent = ({ html, getState }) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <h2>${label}</h2>
        </div>
    `;
};
