/**
interface UpdateState<T> {
    <K extends keyof ExtractState<T>>(
        prop: K,
        value: (arg0: ExtractState<T>[K]) => Partial<ExtractState<T>[K]>,
        options?: {
            emit?: boolean;
            clone?: boolean;
        }
    ): void;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(
        prop: () => K,
        value: (arg0: K) => NoInfer<K>,
        options?: {
            emit?: boolean;
            clone?: boolean;
        }
    ): void;
}
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ updateState }) => {
    const proxi = getProxi();

    /**
     * Use proxi
     */
    updateState('counter', (value) => (value += 1));

    /**
     * Mutate counter state.
     */
    updateState(
        () => proxi.counter,
        (value) => (value += 1)
    );

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
