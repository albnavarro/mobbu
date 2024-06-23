setState(
    prop: string,
    newValue: any,
    fireCallback?: boolean,
    clone?: boolean
): void;


/**
 * @type {import("../mobjs/type").mobComponent<'label'|'counter'>}
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
