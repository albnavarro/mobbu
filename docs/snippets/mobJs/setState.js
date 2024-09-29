/**
export type SetState<T> = <K extends keyof T>(
    prop: K,
    value: T[K],
    fireCallback?: boolean,
    clone?: boolean
) => void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
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
