/**
export interface Watch<T> {
   <K extends keyof ExtractState<T>>(
       prop: K,
       callback: (
           current: ExtractState<T>[K],
           previous: ExtractState<T>[K],
           validate: boolean
       ) => void,
       options?: {
           wait?: boolean;
           immediate?: boolean;
       }
   ): () => void;
   <K extends T[keyof ExtractState<T>]>(
       prop: () => K,
       callback: (
           current: K,
           previous: K,
           validate: MobStoreValidateState
       ) => void,
       options?: { wait?: boolean; immediate?: boolean }
   ): () => void;
}
 */

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getState, watch, setRef, getRef }) => {
    const { label } = getState();

    onMount(() => {
        const { labelRef } = getRef();

        /**
         * With proxi
         */
        const unwatch = watch(
            () => proxi.myState,
            (value) => {
                labelRef.classList.toggle('myClass', value);
            }
        );

        /**
         * Use string
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
