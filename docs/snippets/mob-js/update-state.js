/**
export type UpdateState<T> = <K extends keyof T>(
    prop: K,
    value: (arg0: T[K]) => T[K],
    fireCallback?: boolean,
    clone?: boolean
) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ updateState }) => {
    /**
     * Mutate counter state.
     */
    updateState('counter', (value) => (value += 1));

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
