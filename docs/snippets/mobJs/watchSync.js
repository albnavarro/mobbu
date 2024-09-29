/**
export type WatchSync<T> = <K extends keyof T>(
    prop: K,
    callback: (current: T[K], previous: T[K], validate: boolean) => void
) => void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, watchSync, getRef, setRef }) => {
    onMount(() => {
        const { labelRef } = getRef();

        /**
         * React to the state mutation.
         */
        watchSync('label', (value) => {
            labelRef.textContent = value;
        });

        return () => {};
    });

    return html`
        <div>
            <h2 ${setRef('labelRef')}></h2>
        </div>
    `;
};
