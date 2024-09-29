/**
export type UpdateState<T> = <K extends keyof T>(
    prop: K,
    value: (arg0: T[K]) => T[K],
    fireCallback?: boolean,
    clone?: boolean
) => void;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, updateState }) => {
    /**
     * Mutate counter state.
     */
    updateState('counter', (value) => (value += 1));

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
