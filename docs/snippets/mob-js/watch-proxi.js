/**
 * Export type Watch<T> = <K extends keyof T>( prop: K, callback: (current: T[K], previous: T[K], validate: boolean) =>
 * void ) => () => void;
 */

import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, watch, setRef, getRef, getProxi }) => {
    const proxi = getProxi();

    onMount(() => {
        const { labelRef } = getRef();

        /**
         * React to the state mutation. unwatch is optional. use to detach watcher before component is destroyed
         */
        const unwatch = watch(
            () => proxi.myState,
            (value) => {
                labelRef.classList.toggle('myClass', value);
            }
        );

        return () => {};
    });

    return html`
        <div>
            <h2 ${setRef('labelRef')}>${proxi.label}</h2>
        </div>
    `;
};
