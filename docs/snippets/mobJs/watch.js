export type Watch<T> = <K extends keyof T>(
    prop: K,
    callback: (current: T[K], previous: T[K], validate: validateState) => void
) => void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, getState, watch }) => {
    const { label } = getState();

    onMount(({ refs }) => {
        const { labelRef } = refs;

        /**
         * React to the state mutation.
         */
        watch('label', (value, oldValue) => {
            labelRef.textContent = value;
        });

        return () => {};
    });

    return html`
        <div>
            <h2 ref="labelRef">${label}</h2>
        </div>
    `;
};
