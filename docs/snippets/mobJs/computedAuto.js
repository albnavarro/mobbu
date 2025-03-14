/**
export type Compunted<T> = <K extends keyof T>(
    prop: K,
    keys: Array<NotValue<keyof T, K>>,
    callback: (arg0: T) => T[K]
) => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ computed, getProxi, bindText }) => {
    const proxi = getProxi();

    computed('sum', () => {
        return proxi.state1 + proxi.state2;
    });

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
