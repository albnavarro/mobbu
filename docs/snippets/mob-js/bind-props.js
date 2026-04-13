import { html, htmlObject } from '@mobJs';

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

    return htmlObject({
        tag: 'main',
        className: 'main',
        content: [
            /**
             * Use string array as observer.
             */
            {
                component: MyChildComponent,
                modules: bindProps({
                    observe: ['label', 'counter'],
                    props: ({ label, counter }) => {
                        return {
                            childProp3: label,
                            childProp4: counter,
                        };
                    },
                }),
            },

            /**
             * Use proxi array as observer.
             */
            {
                component: MyChildComponent,
                modules: bindProps({
                    observe: [() => proxi.label, () => proxi.counter],
                    props: ({ label, counter }) => {
                        return {
                            childProp3: label,
                            childProp4: counter,
                        };
                    },
                }),
            },
        ],
    });
};
