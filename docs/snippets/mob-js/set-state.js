import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ setState, getProxi }) => {
    const proxi = getProxi();

    /**
     * Key as string
     */
    setState('label', 'my label');

    /**
     * Key as proxi
     */
    setState(() => proxi.label, 'my label');

    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
