/**
export type Watch<T> = <K extends keyof T>(
    prop: K,
    callback: (current: T[K], previous: T[K], validate: boolean) => void
) => void;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
    onMount,
    getState,
    watch,
    setRef,
    getRef,
}) => {
    const { label } = getState();

    onMount(() => {
        const { labelRef } = getRef();

        /**
         * React to the state mutation.
         */
        watch('label', (value) => {
            labelRef.textContent = value;
        });

        return () => {};
    });

    return html`
        <div>
            <h2 ${setRef('labelRef')}>${label}</h2>
        </div>
    `;
};
