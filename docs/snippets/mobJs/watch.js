/**
export type Watch<T> = <K extends keyof T>(
    prop: K,
    callback: (current: T[K], previous: T[K], validate: boolean) => void
) => () => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, getState, watch, setRef, getRef }) => {
    const { label } = getState();

    onMount(() => {
        const { labelRef } = getRef();

        /**
         * React to the state mutation.
         */
        const unwatch = watch('myState', (value) => {
            labelRef.classList.toggle('myClass', value);
        });

        return () => {};
    });

    return html`
        <div>
            <h2 ${setRef('labelRef')}>${label}</h2>
        </div>
    `;
};
