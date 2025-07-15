/**
interface Computed<T> {
    <K extends keyof ExtractState<T>>(
        prop: K,
        callback: (arg0: ExtractState<T>) => ExtractState<T>[K],
        keys?: (
            | NotValue<keyof ExtractState<T>, K>
            | (() => T[keyof ExtractState<T>])
        )[]
    ): void;
    <K extends T[keyof ExtractState<T>]>(
        prop: () => K,
        callback: (arg0: ExtractState<T>) => NoInfer<K>,
        keys?: (
            | NotValue<keyof ExtractState<T>, K>
            | (() => T[keyof ExtractState<T>])
        )[]
    ): void;
}
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ computed, getProxi, bindText }) => {
    const proxi = getProxi();

    // use proxi as dependencies
    computed('sum', () => {
        return proxi.state1 + proxi.state2;
    });

    // use proxi as propierites and dependencies
    computed(
        () => proxi.sum,
        () => {
            return proxi.state1 + proxi.state2;
        }
    );

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
