/**
export type SetState<T> = <K extends keyof T>(
    prop: K,
    value: T[K],
    fireCallback?: boolean,
) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ setState }) => {
    /**
     * Mutate label state.
     */
    setState('label', 'my label');

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
