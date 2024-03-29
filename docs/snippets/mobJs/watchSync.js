watchSync(prop: string, callback: () => void): void;


/**
 * @param {import("../../../src/js/mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, watchSync }) => {
    onMount(({ refs }) => {
        const { labelRef } = refs;

        /**
         * React to the state mutation.
         */
        watchSync('label', (value, oldValue) => {
            labelRef.textContent = value;
        });

        return () => {};
    });

    return html`
        <div>
            <h2 ref="labelRef"></h2>
        </div>
    `;
};
