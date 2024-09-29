/**
export type GetState<T> = () => T;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
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
