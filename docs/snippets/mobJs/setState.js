/**
export type SetState<T> = <K extends keyof T>(
    prop: K,
    value: T[K],
    fireCallback?: boolean,
    clone?: boolean
) => void;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, setState }) => {
    /**
     * Mutate label state.
     */
    setState('label', 'my label');

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
