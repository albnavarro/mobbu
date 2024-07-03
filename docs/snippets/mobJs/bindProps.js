export type BindProps<T, R> = (arg0: {
    bind: Array<OnlyStringKey<T>>;
    forceParent?: boolean;
    props: (arg0: T, index: number) => Partial<R>;
}) => string;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
                    props: ({ label, counter, otherProp }) => {
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
