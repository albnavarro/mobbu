/**
export type Compunted<T> = <K extends keyof T>(
    prop: K,
    keys: Array<NotValue<keyof T, K>>,
    callback: (arg0: T) => T[K]
) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ computed, bindText }) => {
    computed(
        'sum',
        ({ state1, state2 }) => {
            return state1 + state2;
        },
        ['state1', 'state2']
    );

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
