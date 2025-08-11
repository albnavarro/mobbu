import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    onMount,
    watch,
    setState,
    updateState,
    bindProps,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        /**
         * Update counter state every 500 ms.
         */
        setTimeout(() => {
            updateState('counter', (value) => (value += 1));
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
            // Use string array as observer.
            <my-child-component
                ${bindProps({
                    observe: ['label', 'counter'],
                    props: ({ label, counter }) => {
                        return {
                            childProp3: label,
                            childProp4: counter,
                        };
                    },
                })}
            ></my-child-component>

            // Use proxi array as observer.
            <my-child-component
                ${bindProps({
                    observe: [() => proxi.label, () => proxi.counter],
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
