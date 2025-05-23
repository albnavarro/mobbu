/**
export type BindProps<T, R> = (arg0: {
    bind?: Array<OnlyStringKey<T>>;
    forceParent?: boolean;
    props: (arg0: T, index: number) => Partial<R>;
}) => string;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    onMount,
    watch,
    setState,
    updateState,
    bindProps,
}) => {
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
            <my-child-component
                ${bindProps({
                    bind: ['label', 'counter'],
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
