/**
export type ProxiState<T> = () => GetState<T>;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    getProxi,
    delegateEvents,
    bindText,
    watch,
    bindProps,
}) => {
    /**
     * Label state initial value.
     */
    const proxiState = getProxi();

    /**
     * Watch counter mutation
     */
    watch('counter', (value) => {
        console.log(value);
    });

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <button
                ${delegateEvents({
                    click: () => {
                        proxiState.counter++;
                    },
                })}
            >
                click me
            </button>
            <div>${bindText`counter value is ${'counter'}`}</div>
            <child-component
                ${bindProps(
                    /** @returns{ReturnBindProps<MyChildState>} */
                    () => ({
                        counter: proxiState.counter,
                    })
                )}
            ></child-component>
        </div>
    `;
};
