/**
interface Computed<T> {
    <K extends keyof T>(
        prop: K,
        callback: (arg0: T) => T[K],
        keys?: Extract<keyof T, string>[]
    ): void;
    <K extends T[keyof T]>(
        prop: () => K,
        callback: (arg0: T) => NoInfer<K>,
        keys?: Extract<keyof T, string>[]
    ): void;
}
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ computed, bindText, getProxi }) => {
    const proxi = getProxi();

    /**
     * Use keys to define props and dependencies
     */
    computed(
        'sum',
        ({ state1, state2 }) => {
            return state1 + state2;
        },
        ['state1', 'state2']
    );

    /**
     * Use proxi to define props and dependencies
     */
    computed(
        () => proxi.sum,
        ({ state1, state2 }) => {
            return state1 + state2;
        },
        [() => proxi.state1, () => proxi.state2]
    );

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
