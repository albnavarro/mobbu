/**
export type ProxiState<T> = () => GetState<T>;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
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
                ${bindProps({
                    bind: ['counter'],
                    /** @returns{ReturnBindProps<import('../type').MyChildState>} */
                    props: () => {
                        return {
                            counter: proxiState.counter,
                        };
                    },
                })}
            ></child-component>
        </div>
    `;
};
