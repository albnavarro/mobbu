watch(prop: string, callback: () => void): void;


/**
 * @type {import("../mobjs/type").mobComponent<'label'>}
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
