export type SetState<T> = <K extends keyof T>(
    prop: K,
    value: T[K] | ((arg0: T[K]) => T[K]),
    fireCallback?: boolean,
    clone?: boolean
) => void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, setState }) => {
    /**
     * Mutate label state.
     */
    setState('label', 'my label');

    /**
     * Mutate counter state.
     */
    setState('counter', (value) => (value += 1));

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
