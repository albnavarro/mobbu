/**
export type GetState<T> = () => T;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ getState }) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <h2>${label}</h2>
        </div>
    `;
};
