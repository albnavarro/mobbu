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
export const MyComponent = ({ computed, getProxi, bindText }) => {
    const proxi = getProxi();

    computed('sum', () => {
        return proxi.state1 + proxi.state2;
    });

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
