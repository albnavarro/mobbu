/**
export type Watch<T> = <K extends keyof T>(
    prop: K,
    callback: (current: T[K], previous: T[K], validate: boolean) => void
) => () => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    onMount,
    getState,
    watchSync,
    setRef,
    getRef,
}) => {
    const { label } = getState();

    onMount(() => {
        const { labelRef } = getRef();

        /**
         * React to the state mutation.
         * Sent the first time as soon as the onMount function is launched.
         *
         */
        const unwatch = watchSync('myState', (value) => {
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
