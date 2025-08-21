import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ updateState }) => {
    const proxi = getProxi();

    /**
     * Key as string
     */
    updateState('counter', (value) => (value += 1));

    /**
     * Key as proxi
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
