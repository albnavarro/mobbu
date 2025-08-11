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
