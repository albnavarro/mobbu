import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ setState, getProxi }) => {
    const proxi = getProxi();

    /**
     * Mutate label state.
     */
    setState('label', 'my label');

    /**
     * Use proxi
     */
    setState(() => proxi.label, 'my label');

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
