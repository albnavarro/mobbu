bindProps(arg0: {
    bind: Array<string>;
    forceParent: [boolean];
    props(arg0: { [key: string]: any }): object;
}): string;


/**
 * @type {import("../mobjs/type").mobComponent<'counter'|'label'>}
 */
export const MyComponent = ({ html, onMount, watch, setState, bindProps }) => {
    onMount(() => {
        /**
         * Update coutner state every 500 ms.
         */
        setTimeout(() => {
            setState('counter', (value) => (value += 1));
        }, 500);

        /**
         * Update label state when counter change.
         */
        watch('counter', (value) => {
            setState('label', `counter value is: ${value}`);
        });

        /**
         * Destroy function
         */
        return () => {};
    });
    return html`
        <div>
            <my-child-component
                ${bindProps({
                    bind: ['label', 'counter'],
                    forceParent: false, // optional
                    props: ({ label, counter }) => {
                        return {
                            childProp3: label,
                            childProp4: counter,
                        };
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
