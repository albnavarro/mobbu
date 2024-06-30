export type GetState<T> = () => T;

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
