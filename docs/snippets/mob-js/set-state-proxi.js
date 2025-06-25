/**
interface SetState<T> {
    <K extends keyof ExtractState<T>>(
        prop: K,
        value: ExtractState<T>[K],
        options?: {
            emit?: boolean;
        }
    ): void;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(
        prop: () => K,
        value: NoInfer<K>,
        options?: {
            emit?: boolean;
        }
    ): void;
}
*/

import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ setState, getProxi }) => {
    const proxi = getProxi();

    /**
     * Mutate label state.
     */
    setState(() => proxi.label, 'my label');

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
